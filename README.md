# E-Commerce Full Stack Project

This project is a comprehensive full-stack e-commerce application built using React for the frontend and Spring Boot for the backend. It encompasses a range of features, including user authentication with Spring Security and JWT, MySQL database integration, and more.

## Technologies Used

The project utilizes a combination of modern and robust technologies:

**Frontend:**

- React: A JavaScript library for building user interfaces
- Tailwind CSS: A utility-first CSS framework for rapid and responsive styling

**Backend:**

- Java 17 (JDK 17): The latest version of the Java Development Kit
- Spring Boot 3.1.1: A Spring framework for rapid and easy Spring Boot application development
- MySQL: A widely used open-source relational database management system
- Spring Security: A framework for providing comprehensive security features in Spring Boot applications
- JSON Web Tokens (JWT): An authentication standard for securely exchanging user information between applications

## Project Structure

The project is organized into two main directories for clear separation of concerns:

- `frontend`: Houses the React frontend code and its dependencies
- `backend`: Contains the Spring Boot backend code and its configurations

## Getting Started

To embark on developing this project, follow these steps:

### Setup

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/Abdurrahman-shaikh/e-commerce-project.git
    cd e-commerce-full-stack
    ```

### Frontend Development

1. **Change Directory:**

    ```bash
    cd react
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Start Frontend:**

    ```bash
    npm start
    

### Backend Development

1. **Open in IntelliJ IDEA:**

    a. Launch IntelliJ IDEA.
    b. Navigate to "File" -> "Open...".
    c. Select the `pom.xml` file within the project's root directory.
    d. Click "Open."

2. **Open in Eclipse:**

    a. Launch Eclipse.
    b. Go to "File" -> "Import...".
    c. Choose "Existing Maven Projects" and click "Next."
    d. Locate the project's root directory and click "Finish."


**Important Note:**

Please make sure to update the `application.properties` file located in the `backend` directory. The database configuration details, such as the database name, username, and password, need to be updated with the appropriate values for your MySQL database setup.

**Specific Instructions:**

1. Navigate to the `spring-boot -> src -> main -> resources` directory.
2. Locate and open the `application.properties` file.
3. Identify the following properties and replace the placeholder values with your actual MySQL database credentials:

   * `spring.datasource.url`: Replace `<your_database_url>` with the actual URL of your MySQL database.
   * `spring.datasource.username`: Replace `<your_database_username>` with your MySQL database username.
   * `spring.datasource.password`: Replace `<your_database_password>` with your MySQL database password.

4. Save the `application.properties` file.
5. Restart the backend application to apply the updated database configuration.

**Example:**

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/<your_database_name>
spring.datasource.username=<your_database_username>
spring.datasource.password=<your_database_password>


By following these instructions and providing the correct MySQL database credentials, you can successfully connect the backend application to your MySQL database.


**Screenshot:**

```

![Screenshot from 2023-11-20 18-16-40](https://github.com/Abdurrahman-shaikh/e-commerce-project/assets/90972063/7a42b49b-13ef-4303-98db-cf17ac378d26)

![Screenshot from 2023-11-20 18-17-10](https://github.com/Abdurrahman-shaikh/e-commerce-project/assets/90972063/35a9c02a-eab5-4d48-a23e-bed53900d3fa)

![Screenshot from 2023-11-20 18-22-04](https://github.com/Abdurrahman-shaikh/e-commerce-project/assets/90972063/cad066b8-33ec-4d26-97d4-b01608029a83)


## Contributing

We welcome contributions from all interested developers. Please follow these guidelines when contributing:

- Create an issue for any bugs or feature requests you encounter.
- Fork the repository and make your changes in a separate branch.
- Submit a pull request once your changes are complete.
- Ensure your changes adhere to the project's coding style and conventions.
- Provide clear and concise commit messages explaining your changes.

By adhering to these guidelines, you can help maintain the project's quality and contribute to its ongoing development.
