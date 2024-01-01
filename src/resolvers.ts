import ProductModel from "./models/productModel";
import User from "./models/userModel";

export const resolvers = {
  Query: {
    hello: () => "Hello, GraphQL!",
    // hi:(_:any,{name}:{name:String})=>`Hey ${name} How Are YOu!`
    hi: (_: any, { name }: { name: String }) => `Hey ${name} How Are YOu!`,
    getTodo: async () => {
      return await fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      );
    },

    getSingleTodo: async (_: any, { id }: { id: number }) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const user = await response.json();
        return user;
      } catch (error) {
        console.error("Error fetching single user data:", error);
        return null;
      }
    },

    getProducts: async (
      _: any,
      {
        title,
        description,
        sortField,
        minPrice,
        maxPrice,
        sortType,
        category,
        inStock,
        page = 1,
        limit = 8,
      }: any
    ) => {
      try {
        let query: any = {};

        // Add $or operator for title and description
        if (title || description) {
          query.$or = [
            { title: { $regex: title, $options: "i" } },
            { description: { $regex: description, $options: "i" } },
          ];
        }

        // Add other filters based on arguments
        if (category) {
          query.category = category;
        }
        if (minPrice || maxPrice) {
          query.price = {}; // Initialize price query object
          if (minPrice) {
            query.price.$gte = Number(minPrice);
          }
          if (maxPrice) {
            query.price.$lte = Number(maxPrice);
          }
        }
        if (inStock !== undefined) {
          query.inStock = inStock;
        }

        // Count total documents based on the query (for pagination)
        const totalProducts = await ProductModel.countDocuments();

        // Apply sorting based on sortField and sortType
        let sort: any = {};
        if (sortField && sortType) {
          sort[sortField] = sortType === "ASC" ? 1 : -1; // 1 for ascending, -1 for descending
        }

        // Perform query with filters, sort, pagination
        const products = await ProductModel.find(query)
          .populate("user", "name email")
          .sort(sort || { createdAt: -1 })
          .skip((page - 1) * limit || 1)
          .limit(limit || 7);
        const data = {
          products,
          inPageProducts: products.length,
          totalCount: totalProducts,
          totalPages: Math.ceil(totalProducts / limit),
          currentPage: page,
        };

        return data;
        // return {
        //   products,
        //   // totalCount: totalProducts,
        //   // totalPages: Math.ceil(totalProducts / limit),
        //   // currentPage: page,
        // };
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
  },

  Mutation: {
    addUser: async (
      _: any,
      { email, name, password }: { email: string; name: string; password: string }
    ) => {
      const existUser: any = await User.findOne({ email });
      if (existUser) {
        throw new Error(`User ${existUser?.email} aready exists!`);
      }

      const newUser = await User.create({ name, email, password });

      // Simulating a 1-second delay before sending the response
      return newUser;
    },

    addProduct: async (
      _: any,
      {
        title,
        description,
        category,
        inStock,
        price,
        userId,
      }: {
        userId: string;
        title: string;
        description: string;
        category: string;
        inStock: string;
        price: number;
      },
      context: any
    ) => {
      // Assuming you have the user ID available in the context

      console.log("userId", context.userId);

      // Check if user ID is available
      // if (!userId) {
      //   throw new Error("User not authenticated");
      // }

      try {
        // Create a new product associated with the user
        const newProduct = new ProductModel({
          title,
          description,
          category,
          inStock,
          price,
          user: userId, // Assign the user ID to the product's user field
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        const populatedProduct = await ProductModel.populate(savedProduct, {
          path: "user",
          model: "User", // Assuming 'User' is the name of the User model
        });
        return populatedProduct;
      } catch (error) {
        console.error("Error adding product:", error);
        throw new Error("Could not add product");
      }
    },
  },
};
