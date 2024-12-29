# CaptionThat: Simple AI-Powered Image Caption Generator

This project is a simple AI-powered image caption generator, where users can upload an image, and the system generates a caption using an AI model. The application utilizes Hugging Face Transformers and PyTorch for the backend image caption generation and is built with React, TypeScript, and Tailwind CSS for the frontend.

## Features
- Upload an image through a user-friendly interface built with React and TypeScript.
- Generate an AI-based caption using Hugging Face Transformers & PyTorch.
- Backend powered by Django REST Framework to handle the image upload and caption generation.
- Responsive UI built with Tailwind CSS.

## Technologies Used
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Django, Django REST Framework, Python
- **AI Model**: Hugging Face Transformers, PyTorch

## Getting Started

To run the development version of the project, follow the steps below:

### 1. Set up the Backend
1. Navigate to the root folder of the project.
2. Install the required dependencies if you haven't already:
    ```bash
    pip install -r requirements.txt
    ```
3. Run the backend server:
    ```bash
    python manage.py runserver
    ```
   This will start the backend on `http://127.0.0.1:8000`.

### 2. Set up the Frontend
1. Navigate to the `frontend/` directory:
    ```bash
    cd frontend
    ```
2. Install the required frontend dependencies:
    ```bash
    npm install
    ```
3. Run the frontend development server:
    ```bash
    npm run dev
    ```
   This will start the frontend on `http://localhost:3000`.

### 3. Using the Application
1. After both the frontend and backend are running, open your browser and go to `http://localhost:3000`.
2. You will be presented with a simple interface where you can upload an image.
3. Once the image is uploaded, click the **Generate Caption** button, and the caption will be displayed.

### Demo

Below is a demo of the application where an image is uploaded and the caption is successfully generated:

![Demo Screenshot](media/demo_screenshot.png)

## Contributing

The project is still in active development, especially the UI, which is in critical development. Any contributions to make the UI more user-friendly and intuitive are greatly appreciated!

Feel free to fork the repository, submit pull requests, or open issues if you have suggestions or find bugs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
