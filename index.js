const express = require("express");
const bodyParser = require("body-parser");
const query = require("./db/customers")
const app = express();
app.use(bodyParser.json());
const port = 3000;

app.get("/api/customers", query.getAllCustomers);
app.get("/api/customers/:id", query.getCustomersByID);
app.post("/api/customers", query.addCustomers);
app.delete("/api/customers/:id", query.deleteCustomers);
app.put("/api/customers/:id", query.updateCustomer);





app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});