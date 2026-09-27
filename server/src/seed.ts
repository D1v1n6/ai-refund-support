import dotenv from "dotenv";
import connectDB from "./config/dbconnection.js";
import Customer from "./models/Customer.js";
import Order from "./models/Order.js";

dotenv.config();

const customers = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 555-0101",
  },
  {
    name: "Clark Kent",
    email: "clark.kent@example.com",
    phone: "+1 555-0102",
  },
  {
    name: "John Stewart",
    email: "john.stewart@example.com",
    phone: "+1 555-0103",
  },
  {
    name: "Barry Allen",
    email: "barry.allen@example.com",
    phone: "+1 555-0104",
  },
  {
    name: "Diana Prince",
    email: "diana.prince@example.com",
    phone: "+1 555-0105",
  },
  {
    name: "Bruce Wayne",
    email: "bruce.wayne@example.com",
    phone: "+1 555-0106",
  },
  {
    name: "Tony Stark",
    email: "tony.stark@example.com",
    phone: "+1 555-0107",
  },
  {
    name: "Steve Rogers",
    email: "steve.rogers@example.com",
    phone: "+1 555-0108",
  },
  {
    name: "Hal Jordan",
    email: "hal.jordan@example.com",
    phone: "+1 555-0109",
  },
  {
    name: "Peter Parker",
    email: "peter.parker@example.com",
    phone: "+1 555-0111",
  },
  {
    name: "Ben Tennyson",
    email: "ben.tennyson@example.com",
    phone: "+1 555-0112",
  },
  {
    name: "Natasha Romanoff",
    email: "natasha.romanoff@example.com",
    phone: "+1 555-0113",
  },
  {
    name: "Arthur Curry",
    email: "arthur.curry@example.com",
    phone: "+1 555-0114",
  },
  {
    name: "Miles Morales",
    email: "miles.morales@example.com",
    phone: "+1 555-0115",
  },
  {
    name: "Oliver Queen",
    email: "oliver.queen@example.com",
    phone: "+1 555-0110",
  },
];

const seed = async () => {
  try {
    await connectDB();

    await Customer.deleteMany({});
    await Order.deleteMany({});

    const createdCustomers = await Customer.insertMany(customers);

    console.log(`${createdCustomers.length} customers created.`);

    const orders = [
      {
        orderNumber: "ORD-001",
        customerId: createdCustomers[0]._id,
        productName: "Wireless Headphones",
        amount: 120,
        orderDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        status: "Delivered",
        isFinalized: false,
      },
      {
        orderNumber: "ORD-1002",
        customerId: createdCustomers[1]._id,
        productName: "Smart Watch",
        amount: 180,
        orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: "Delivered",
        isFinalSale: false,
      },
      {
        orderNumber: "ORD-1003",
        customerId: createdCustomers[4]._id,
        productName: "Designer Sunglasses",
        amount: 250,
        orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: "Delivered",
        isFinalSale: true,
      },
      {
        orderNumber: "ORD-1004",
        customerId: createdCustomers[5]._id,
        productName: "Gaming Laptop",
        amount: 950,
        orderDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        status: "Delivered",
        isFinalSale: false,
      },
      {
        orderNumber: "ORD-1005",
        customerId: createdCustomers[6]._id,
        productName: "Mechanical Keyboard",
        amount: 750,
        orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        status: "Delivered",
        isFinalSale: false,
      },
      {
        orderNumber: "ORD-1006",
        customerId: createdCustomers[7]._id,
        productName: "Bluetooth Speaker",
        amount: 90,
        orderDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        status: "Cancelled",
        isFinalSale: false,
      },
      {
        orderNumber: "ORD-1007",
        customerId: createdCustomers[8]._id,
        productName: "Running Shoes",
        amount: 140,
        orderDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        status: "Delivered",
        isFinalSale: false,
      },
    ];
    await Order.insertMany(orders);

    console.log(`${orders.length} orders created`);
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seed();
