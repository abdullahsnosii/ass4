const mysql2 = require('mysql2/promise');
const { db, bootstrap } = require('./db.js')
const express = require('express');
const app = express();
const port = 3000;

bootstrap(app, port)
app.use(express.json())


// ans part 3 api
// ans Q2

// app.post("/add/product", async (req, res, next) => {
//    try {
//     const { name , price ,stockQuantity , suppliers_id     } = req.body
//     console.log({  name, price, stockQuantity, suppliers_id });

//     const getquery = `SELECT  s_id FROM suppliers WHERE s_id=?`
//     const [supplier] = await db.execute(getquery, [suppliers_id])
//     if (!supplier?.length) {
//         return res.status(404).json({ message: "supplier not found" })
//     }

//     const findquery = `SELECT  p_name FROM products WHERE p_name=?`
//     const [duplicatedProduct] = await db.execute(findquery, [name])
//     if (duplicatedProduct?.length) {
//         return res.status(409).json({ message: "Product already exist" })
//     }
//     const insertquery = `INSERT INTO products (p_name, p_price, p_stockQuantity, suppliers_id) VALUES(?,?,?,?)`
//     const [product] = await db.execute(insertquery, [name, price, stockQuantity, suppliers_id])
//     if (!product.affectedRows) {
//         return res.status(400).json({ message: "fail to create this product" })
//     }
//     return res.status(201).json({ message: "done", product })
// }catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "internal server error" , error: error.message})
// }
// }
// )


// app.get('/find/products', async (req, res, next) => {
//     try {
//         const findquery = `SELECT * FROM products`
//         const [data, fields] = await db.execute(findquery);
//         if (!data?.length) {
//             return res.status(404).json({ message: " No products found " })
//         }
//         return res.status(200).json({ message: 'done', data: data, });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// }
// );



// app.get('/products/:userId', async (req, res, next) => {
//     try {
//         const findquery = `SELECT * FROM products WHERE p_id=?`
//         const [data, fields] = await db.execute(findquery, [req.params.userId]);
//         if (!data?.length) {
//             return res.status(404).json({ message: " Invalid product from id  " })
//         }
//         return res.status(200).json({ message: 'done', data: data, });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// }
// );


// app.patch("/products/:pruductId", async (req, res, next) => {
//     try {
//         const { productId } = req.params
//         const { name, price } = req.body

//         console.log({ name, price, productId });
//         const updateQuery = `UPDATE products SET p_name=? , p_price=?  where p_id=? `
//         const [data] = await db.execute(updateQuery, [name, price, productId])
//         if (!data?.affectedRows) {
//             return res.status(404).json({ message: " Invalid product from id  " })

//         }
//         return res.status(200).json({ message: "Done",  data })
//     } catch (error ) {

//         return res.status(500).json({ message: error.message });
//     }

// }
// )

// app.delete("/products/:productId", async (req, res, next) => {
//     try {
//         const { productId } = req.params


//         const deleteQuery = `DELETE FROM products WHERE p_id=?`
//         const [data] = await db.execute(deleteQuery, [productId])
//         if (!data?.affectedRows) {
//             return res.status(404).json({ message: " Invalid product from id  " })

//         }
//         return res.status(200).json({ message: "Done",  data })
//     } catch (error ) {

//         return res.status(500).json({ message: error.message });
//     }

// }) 


// ans q3

app.post("/add/Suppliers", async (req, res, next) => {
    try {
        const { name, contactNumber } = req.body
        console.log({ name, contactNumber });

        const findquery = `SELECT  s_name FROM suppliers WHERE s_name=?`
        const [duplicatedProduct] = await db.execute(findquery, [name])
        if (duplicatedProduct?.length) {
            return res.status(409).json({ message: "Supplier already exist" })
        }
        const insertquery = `INSERT INTO suppliers (s_name, s_contactNumber) VALUES(?,?)`
        const [supplier] = await db.execute(insertquery, [name, contactNumber])
        if (!supplier.affectedRows) {
            return res.status(400).json({ message: "fail to create this supplier" })
        }
        return res.status(201).json({ message: "done", supplier })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error", error: error.message })
    }
}
)


app.get('/find/suppliers', async (req, res, next) => {
    try {
        const findquery = `SELECT * FROM suppliers`
        const [data, fields] = await db.execute(findquery);
        if (!data?.length) {
            return res.status(404).json({ message: " No suppliers found " })
        }
        return res.status(200).json({ message: 'done', data: data, });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
);

app.patch("/suppliers/:supplierId", async (req, res, next) => {
    try {
        const { supplierId } = req.params
        const { name, contactNumber } = req.body

        console.log({ name, contactNumber, supplierId });
        const updateQuery = `UPDATE suppliers SET s_name=? , s_contactNumber=?  where s_id=? `
        const [data] = await db.execute(updateQuery, [name, contactNumber, supplierId])
        if (!data?.affectedRows) {
            return res.status(404).json({ message: " Invalid supplier from id  " })

        }
        return res.status(200).json({ message: "Done", data })
    } catch (error) {

        return res.status(500).json({ message: error.message });
    }

}
)

app.delete("/suppliers/:supplierId", async (req, res, next) => {
    try {
        const { supplierId } = req.params

        const deleteQuery = `DELETE FROM suppliers WHERE s_id=?`
        const [data] = await db.execute(deleteQuery, [supplierId])
        if (!data?.affectedRows) {
            return res.status(404).json({ message: " Invalid supplier   from id  " })

        }
        return res.status(200).json({ message: "Done", data })
    } catch (error) {

        return res.status(500).json({ message: error.message });
    }

})


// ans q4


// app.post("/add/sale", async (req, res, next) => {
//    try {
//     const { quantitySold ,	date	, p_ID    } = req.body
//     console.log({  quantitySold, date, p_ID });

//     const getquery = `SELECT  p_id FROM products WHERE p_id=?`
//     const [product] = await db.execute(getquery, [p_ID])
//     if (!product?.length) {
//         return res.status(404).json({ message: "product not found" })
//     }

//     const findquery = `SELECT  s_date FROM sales WHERE s_date=?`
//     const [duplicatedProduct] = await db.execute(findquery, [date])
//     if (duplicatedProduct?.length) {
//         return res.status(409).json({ message: "Sale already exist" })
//     }
//     const insertquery = `INSERT INTO sales (s_quantitySold, s_date, p_ID) VALUES(?,?,?)`
//     const [sale] = await db.execute(insertquery, [quantitySold, date, p_ID])
//     if (!sale.affectedRows) {
//         return res.status(400).json({ message: "fail to create this sale" })
//     }
//     return res.status(201).json({ message: "done", sale })
// }catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "internal server error" , error: error.message})
// }
// }
// )

// app.get("/sales", async (req, res) => {
//   try {
//     const findQuery = "SELECT * FROM sales";
//     const [data] = await db.execute(findQuery);
//     if (!data?.length) {
//       return res.status(404).json({ message: "no sales found" });
//     }
//     return res.status(200).json({ message: "done", data });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });


// app.get("/sales/product/:productId", async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const findQuery = "SELECT * FROM sales WHERE p_id=?";
//     const [data] = await db.execute(findQuery, [productId]);
//     if (!data?.length) {
//       return res.status(404).json({ message: "no sales found for this product" });
//     }
//     return res.status(200).json({ message: "done", data });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });




// ans q5


// app.patch("/products/addcolumn", async (req, res, next) => {
//     try {
//         const { nameColumn } = req.body
//         console.log({ nameColumn });
//         if (!nameColumn) {
//             return res.status(400).json({ message: "nameColumn is required" })
//         }
//         const addColumnQuery = `ALTER TABLE products ADD COLUMN ${nameColumn} VARCHAR(255)`
//         const [data] = await db.execute(addColumnQuery)
//         return res.status(200).json({ message: "Done",  data })
//     } catch (error ) {

//         return res.status(500).json({ message: error.message });
//     }

// }
// )


// app.patch("/products/deletecolumn", async (req, res, next) => {
//     try {
//         const { nameColumn } = req.body
//         console.log({ nameColumn });
//         if (!nameColumn) {
//             return res.status(400).json({ message: "nameColumn is required" })
//         }
//         const deleteColumnQuery = `ALTER TABLE products DROP COLUMN ${nameColumn}`
//         const [data] = await db.execute(deleteColumnQuery)
//         return res.status(200).json({ message: "Done",  data })
//     } catch (error ) {

//         return res.status(500).json({ message: error.message });
//     }

// }
// )



// app.patch("/suppliers/changeDataType", async (req, res, next) => {
//     try {
//         const { nameColumn } = req.body
//         console.log({ nameColumn });
//         if (!nameColumn) {
//             return res.status(400).json({ message: "nameColumn is required" })
//         }
//         const changeColumnQuery = `ALTER TABLE suppliers MODIFY ${nameColumn} VARCHAR(15)`
//         const [data] = await db.execute(changeColumnQuery)
//         return res.status(200).json({ message: "Done", data })
//     } catch (error) {

//         return res.status(500).json({ message: error.message });
//     }

// }
// )

// app.patch("/products/changeTONOTNULL", async (req, res, next) => {
//     try {
//         const { nameColumn } = req.body
//         console.log({ nameColumn });
//         if (!nameColumn) {
//             return res.status(400).json({ message: "nameColumn is required" })
//         }
//         const changeColumnQuery = `ALTER TABLE products MODIFY ${nameColumn} VARCHAR(255) NOT NULL`
//         const [data] = await db.execute(changeColumnQuery)
//         return res.status(200).json({ message: "Done", data })
//     } catch (error) {

//         return res.status(500).json({ message: error.message });
//     }

// }
// )


// ANS Q6   لي اعمله مش فاهم سبب


// ans q6


// app.post("/seed-data", async (req, res, next) => {
//   try {
//     const { supplierName, contactNumber, productName1, price1, stock1, productName2, price2, stock2, productName3, price3, stock3, quantitySold, saleDate } = req.body;

//     // A.
//     const supplierQuery = `INSERT INTO suppliers (s_name, s_contactNumber) VALUES (?, ?)`;
//     const [supplierResult] = await db.execute(supplierQuery, [supplierName, contactNumber]);
//     const supplierId = supplierResult.insertId;

//     // B.
//     const productQuery = `INSERT INTO products (p_name, p_price, p_stockQuantity, suppliers_id ) VALUES (?, ?, ?, ?)`;
    
//     const [milkResult] = await db.execute(productQuery, [productName1, price1, stock1, supplierId]);
//     await db.execute(productQuery, [productName2, price2, stock2, supplierId]);
//     await db.execute(productQuery, [productName3, price3, stock3, supplierId]);

//     // C.
//     const milkId = milkResult.insertId;
//     const saleQuery = `INSERT INTO sales (s_quantitySold, s_date, p_ID) VALUES (?, ?, ?)`;
//     const [sale] = await db.execute(saleQuery, [quantitySold, saleDate, milkId]);

//     return res.status(201).json({ message: "Done", sale });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "internal server error", error: error.message });
//   }
// });


// ans q7
// app.patch("/products/update-bread-price", async (req, res) => {
//   try {
//     const { price, name } = req.body; 

//     const updateQuery = `UPDATE products SET p_price = ? WHERE p_name = ?`;
//     const [result] = await db.execute(updateQuery, [price, name]);

//     if (!result.affectedRows) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     return res.status(200).json({ message: "Done", result });
//   } catch (error) {
//     return res.status(500).json({ message: "internal server error", error: error.message });
//   }
// });




 // ans q8
// app.patch("/products/delete-eggs", async (req, res) => {
//   try {
//     const { name } = req.body; 

//     const deleteQuery = `DELETE FROM products WHERE p_name = ?`;
//     const [result] = await db.execute(deleteQuery, [name]);

//     if (!result.affectedRows) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     return res.status(200).json({ message: "Done", result });
//   } catch (error) {
//     return res.status(500).json({ message: "internal server error", error: error.message });
//   }
// });





// ans q9




// app.get("/reports/total-quantity-sold", async (req, res) => {
//   try {
//     const query = `
//       SELECT p.p_name, SUM(s.s_quantitySold) AS totalSold 
//       FROM products p 
//       LEFT JOIN sales s ON p.p_ID = s.p_ID 
//       GROUP BY p.p_ID, p.p_name
//     `;
//     const [reports] = await db.execute(query);

//     return res.status(200).json({ message: "Done", reports });
//   } catch (error) {
//     return res.status(500).json({ message: "internal server error", error: error.message });
//   }
// });







// ans q10
// app.get("/reports/highest-stock", async (req, res) => {
//   try {
//     const query = `SELECT * FROM products ORDER BY p_stockQuantity DESC LIMIT 1`;
//     const [product] = await db.execute(query);

//     return res.status(200).json({ message: "Done", product: product[0] });
//   } catch (error) {
//     return res.status(500).json({ message: "internal server error", error: error.message });
//   }
// });




// ans q11

// app.get("/reports/suppliers-start-with-f", async (req, res) => {
//   try {
    
//     const query = `SELECT * FROM suppliers WHERE s_name LIKE 'F%'`;
//     const [suppliers] = await db.execute(query);

//     return res.status(200).json({ message: "Done", suppliers });
//   } catch (error) {
//     return res.status(500).json({ message: "internal server error", error: error.message });
//   }
// });







//  ans q12


// app.get("/reports/never-sold-products", async (req, res) => {
//   try {
//     const query = `
//       SELECT p.* 
//       FROM products p 
//       LEFT JOIN sales s ON p.p_ID = s.p_ID 
//       WHERE s.s_ID IS NULL
//     `;
//     const [products] = await db.execute(query);

//     return res.status(200).json({ message: "Done", products });
//   } catch (error) {
//     return res.status(500).json({ message: "internal server error", error: error.message });
//   }
// });



 // ans q13


//  app.get("/reports/all-sales-with-products", async (req, res) => {
//   try {
//     const query = `
//       SELECT s.s_ID, s.s_quantitySold, s.s_date, p.p_name, p.p_price 
//       FROM sales s 
//       JOIN products p ON s.p_ID = p.p_ID
//     `;
//     const [sales] = await db.execute(query);

//     return res.status(200).json({ message: "Done", sales });
//   } catch (error) {
//     return res.status(500).json({ message: "internal server error", error: error.message });
//   }
// });



// sql script for q14,15,16 

// CREATE USER IF NOT EXISTS 'store_manager'@'localhost' IDENTIFIED BY 'password123';
// GRANT SELECT, INSERT, UPDATE ON `small retailstore`.* TO 'store_manager'@'localhost';
// FLUSH PRIVILEGES;

// REVOKE UPDATE ON `small retailstore`.* FROM 'store_manager'@'localhost';
// FLUSH PRIVILEGES;

// GRANT DELETE ON `small retailstore`.sales TO 'store_manager'@'localhost';
// FLUSH PRIVILEGES;





// ans bonus 

// SELECT 
//     v.customer_id, 
//     COUNT(v.visit_id) AS count_no_trans
// FROM Visits v
// LEFT JOIN Transactions t 
//     ON v.visit_id = t.visit_id
// WHERE t.transaction_id IS NULL
// GROUP BY v.customer_id;