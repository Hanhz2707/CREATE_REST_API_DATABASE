const db = require("./dbconfig");

//Get all customers
const getAllCustomers = (req,res) => {
    db.query("SELECT * FROM customers", (err, result) => {
        if (err)
            console.error(err);
        else
            res.json(result.rows)
    })
}

//Add new customers
const addCustomers = (req,res) => {
    //Extract customer from the request body
    const newCustomers = req.body;

    const query = {
        text: "INSERT INTO customers (firstname, lastname, email, phone) VALUES($1, $2, $3, $4)",
        values: [newCustomers.firstname, newCustomers.lastname, newCustomers.email, newCustomers.phone],

    }
    db.query(query, (err,res)=> {
        if (err) {
            return console.error("Error executing query", err.stack)
        }
    })
    res.json(newCustomers);
}

//Delete customer with ID
const deleteCustomers = (req,res) => {
    const query = {
        text: "DELETE FROM customers WHERE ID = $1",
        values: [req.params.id],
    }
    db.query(query, (err, res) => {
        if (err) {
            return console.error("Error executing query", err.stack)
        }
    })
    res.status(204).end()
}

//Update a customer
const updateCustomer = (req,res) => {
    const editCustomer = req.body;

    const query = {
        text: "UPDATE customers SET firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id = $5",
        values: [editCustomer.firstname, editCustomer.lastname,editCustomer.email,editCustomer.phone, req.params.id],
    }
    db.query(query, (err, res) => {
        if (err) {
            return console.error("Error executing query", err.stack)
        }
    })
    res.json(editCustomer);
}

//Get customers by ID
const getCustomersByID = (req, res) => {
    const query = {
        text: "SELECT * FROM customers WHERE ID = $1",
        values: [req.params.id],
    }
    db.query(query, (err, result) => {
        if (err) {
            return console.error("Error executing query", err.stack)
        }
        else {
            if (result.rows.length > 0)
                res.json(result.rows);
            else
                res.status(404).end();
        }
        
    })
}

module.exports = {
    getAllCustomers: getAllCustomers,
    getCustomersByID: getCustomersByID,
    addCustomers: addCustomers,
    deleteCustomers: deleteCustomers,
    updateCustomer: updateCustomer
}