import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";


export const productController = async (req: IncomingMessage, res: ServerResponse) => {
    // console.log("Request", res);
    const url = req.url
    const method = req.method
    // /products => /products/1 => ['', 'products', '1']

    const urlParts = url?.split("/");
    // console.log(urlParts);
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
    // console.log("This is the acutal id : ", id)
    // Get All Products
    if (url === "/products" && method === "GET") {

        // const product = [
        //     {
        //         i: 1,
        //         name: "Product - 1",
        //     },

        // ];
        const product = readProduct();

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Products retrived succeefully", data: product,

        }),
        );
    } else if (method === "GET" && id !== null) {
        // Get Single Products
        const products = readProduct();
        const product = products.find((p: IProduct) => p.id === id);
        // console.log(product);



        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Products retrived succeefully", data: product,

        }),
        );
    } else if (method == "POST" && url === "/products") {
        const body = await parseBody(req);
        console.log("Body", body);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Products created succeefully",
            // data: product,


        }),
        );
    }
};