# Railway Deployment Configuration for AgenticRAG_X

## Required Environment Variables

Copy these variables to your Railway project settings:

```env
# Core Settings
RAGFLOW_IMAGE=infiniflow/ragflow:v0.24.0
COMPOSE_PROFILES=cpu

# Database
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=infini_rag_flow
MYSQL_DB=rag_flow

# MinIO
MINIO_HOST=minio
MINIO_PORT=9000
MINIO_CONSOLE_PORT=30001
MINIO_ROOT_USER=rag_flow
MINIO_ROOT_PASSWORD=infini_rag_flow

# Elasticsearch
ES_HOST=es01
ES_PORT=9200
ES_USER=elastic
ES_PASSWORD=infini_rag_flow

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=infini_rag_flow

# Server Ports
SVR_HTTP_PORT=80
SVR_HTTPS_PORT=443
ADMIN_SVR_HTTP_PORT=9381
SVR_MCP_PORT=9382

# Web Ports
SVR_WEB_HTTP_PORT=80
SVR_WEB_HTTPS_PORT=443

# LLM Configuration
# Add your API keys here after deployment
# ZHIPU_API_KEY=your_key_here
# PADDLEOCR_ACCESS_TOKEN=your_token_here
```

## Deployment Steps

1. **Go to Railway**: https://railway.app
2. **Login with GitHub**
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose**: `1256048998/AgenticRAG_X`
6. **Wait for auto-detection** of Docker Compose
7. **Add Environment Variables** (copy from above)
8. **Deploy**

## Post-Deployment

After deployment, Railway will provide a public URL.

Default admin credentials (first user becomes admin):
- Register at: `https://your-railway-url.com`
- First registered user = admin

## Services Included

- **Web UI**: Port 80/443
- **API Server**: Port 9380
- **MySQL**: Port 3306
- **Elasticsearch**: Port 9200
- **Redis**: Port 6379
- **MinIO**: Port 9000
