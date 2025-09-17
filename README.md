## **1. Show existing databases**

```sql
SHOW DATABASES;
```

* Lists all databases on your MySQL server.

---

## **2. Create a new database**

```sql
CREATE DATABASE testdb;
```

* Creates a database named `testdb`.

---

## **3. Use a database**

```sql
USE testdb;
```

* Switches to the database `testdb` so you can create tables and insert data.

---

## **4. Create a table**

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);
```

* Creates a table called `users` with three columns: `id`, `name`, and `email`.

---

## **5. Insert data into the table**

```sql
INSERT INTO users (name, email) VALUES ('Rasel', 'rasel@example.com');
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
```

* Adds two rows of data into the `users` table.

---

## **6. View the data**

```sql
SELECT * FROM users;
```

* Shows all the data in the `users` table.

---

## **7. Update data**

```sql
UPDATE users SET email = 'rasel123@example.com' WHERE name = 'Rasel';
```

* Changes Rasel’s email address.

---

## **8. Delete data**

```sql
DELETE FROM users WHERE name = 'Alice';
```

* Removes Alice’s row from the table.

---

## **9. Drop a table or database**

* Drop table:

```sql
DROP TABLE users;
```

* Drop database:

```sql
DROP DATABASE testdb;
```

---

### ✅ Quick tips:

* Always end commands with **`;`**.
* Start with `SHOW DATABASES;` to see what’s already there.
* Use `USE database_name;` before creating tables.

