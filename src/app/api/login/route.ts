import bcrypt from "bcrypt";
import {MongoClient} from "mongodb";

export async function POST(req: Request) {
    const body = await req.json();

    let {email, password} = body;
    password = await bcrypt.hash(password, 10);

    // =================================================
    const client = new MongoClient(process.env['DB_URL']!);
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db("Assignment_Project");
    const collection = db.collection('login'); // collection name

    const findResult = await collection.find({"email":
        email, "password": password}).toArray();

    let valid = false
    console.log("result length " + findResult.length);
    if(findResult.length >0 ) {
        valid = true;
    }

    console.log(valid)

    // at the end of the process we need to send something back.
    return Response.json({"data": valid})
}