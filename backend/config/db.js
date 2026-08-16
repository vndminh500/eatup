import mongoose from "mongoose";
import { seedAdmin } from "./adminSeed.js";

export const connectDB = async () => {
    const uri = 'mongodb://eatup_db:142836@ac-oers2aa-shard-00-00.tkbl4gi.mongodb.net:27017,ac-oers2aa-shard-00-01.tkbl4gi.mongodb.net:27017,ac-oers2aa-shard-00-02.tkbl4gi.mongodb.net:27017/food-app?ssl=true&replicaSet=atlas-gs858k-shard-0&authSource=admin&appName=EatUpCluster';
    if (!uri) {
        console.error("Thiếu MONGO_URI");
        process.exit(1);
    }
    try {
        await mongoose.connect(uri);
        const dbName = mongoose.connection.db?.databaseName;
        console.log("Đã kết nối với Database");
        if (dbName) {
            console.log(`Tên database: "${dbName}"`);
        }
        await seedAdmin();
    } catch (err) {
        console.error("Lỗi kết nối MongoDB:", err);
        process.exit(1);
    }
};
