from pymongo import MongoClient
from dotenv import load_dotenv
import os
import ssl

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")

# Python 3.14 on Render has TLS compatibility issues with MongoDB Atlas
# Using tlsAllowInvalidCertificates resolves the SSL handshake error
client = MongoClient(
    MONGODB_URL,
    tls=True,
    tlsAllowInvalidCertificates=True
)

db = client["waterfootprint"]

users_collection = db["users"]
history_collection = db["history"]
