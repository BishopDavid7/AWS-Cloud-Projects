# 🖼️ **Image Labels Generator using AWS Rekognition**

## **📌 Project Overview**
The **Image Labels Generator** is a cloud-based application that uses **Amazon Rekognition** to analyze images and extract object labels.  
This solution is particularly useful for **inventory management**, as it helps in identifying products in a store by analyzing uploaded images.

---

## **🚀 Features**
✅ Upload images to **Amazon S3**  
✅ Automatically analyze and extract labels using **Amazon Rekognition**  
✅ Retrieve identified labels via **AWS API Gateway** and **AWS Lambda**  
✅ Display results on a **user-friendly web interface**  

---

## **🛠️ Technologies Used**
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** AWS Lambda, API Gateway  
- **Storage:** Amazon S3  
- **Machine Learning:** Amazon Rekognition  
- **Infrastructure:** AWS IAM, AWS Free Tier  

---
## **📜 Project Structure**
AWS-Image-Label-Generator/
│── backend/
│   ├── lambda_function.py   # AWS Lambda function script
│   ├── rekognition_helper.py # Rekognition helper functions
│── frontend/
│   ├── index.html  # Main web UI
│   ├── script.js   # JavaScript logic
│   ├── styles.css  # Styling
│── docs/
│   ├── ImageLabelGeneratorProject.png  # Architecture Diagram
│── README.md  # Documentation


## 🌐 Architecture Diagram

![Image Label Generator Architecture](https://github.com/BishopDavid7/AWS-Image-Label-Generator/raw/main/docs/ImageLabelGeneratorProject.png)
---
---

## **🔧 How to Set Up and Deploy the Project**

### **🚀 Deploy Backend**
Follow these steps to set up the backend on AWS:

#### **Step 1: Create an S3 Bucket**
1. Go to the **AWS S3 Console**.
2. Click **Create bucket**, enter a unique bucket name, and choose a region.
3. Disable **Block Public Access** settings (only if necessary for access).
4. Click **Create bucket**.

#### **Step 2: Configure Amazon Rekognition**
1. Go to the **AWS IAM Console**.
2. Create a **new IAM role**.
3. Attach **Amazon Rekognition Full Access** and **S3 Full Access** policies.
4. Attach this IAM role to the AWS Lambda function.

#### **Step 3: Deploy AWS Lambda Function**
1. Open **AWS Lambda Console**.
2. Click **Create function** → **Author from scratch**.
3. Set runtime to **Python 3.x** and assign the IAM role created in Step 2.
4. Copy and paste the `lambda_function.py` script from this repository.
5. Click **Deploy**.

#### **Step 4: Configure API Gateway**
1. Open **AWS API Gateway Console**.
2. Click **Create API** → **REST API**.
3. Add a **POST method** linked to the Lambda function.
4. Deploy the API and copy the **Invoke URL**.

---

### **🎨 Deploy Frontend**
1. **Modify `index.html`**
   - Update `script.js` to include the **API Gateway Invoke URL**.
   - Example:
   ```javascript
   const API_GATEWAY_URL = "https://your-api-gateway-url.amazonaws.com/prod";

## **🔧 How to Run This Project**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/BishopDavid7/AWS-Cloud-Projects.git
cd AWS-Cloud-Projects