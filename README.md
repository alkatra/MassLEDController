# MassLEDController

The "MassLEDController" repository houses a comprehensive project designed to simulate the limitations of embedded devices and offer a scalable solution for their control. This system effectively handles the control of a large number of emulated LEDs using a distributed architecture with microservices, MQTT messaging, a backend API, and a frontend interface with access control.

Key Components:
1. **Backend & Microservices**: The system starts with an API call to the backend to toggle an LED. This information is then sent to a microservice, which uses MQTT to communicate with the appropriate emulated LED.
2. **Emulated LEDs**: The LEDs are emulated by a Node.js program and maintain their states. They receive MQTT signals to toggle their state and send an MQTT response back indicating success or failure.
3. **Database Integration**: After receiving the 200 OK signal from the microservice, the backend updates the LED state in the database and displays it to the user via the frontend.
4. **Frontend with Access Control**: The frontend provides a user interface that restricts access based on user roles. Users can only access LEDs on their floor, while admins have full access. Users can toggle LEDs and view their current state.
5. **AWS Load Balancers**: Implemented to balance the load of the backend and the MQTT microservice, ensuring scalability.

This project, while complex, showcases a scalable solution for the control of multiple devices and their states. While the primary focus has been on scalability, not security, this project is an excellent resource for anyone looking to understand distributed systems, microservices, or the MQTT protocol.

