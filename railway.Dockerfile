# Railway Deployment - Simplified Dockerfile
# This is a simplified version for Railway deployment

FROM infiniflow/ragflow:v0.24.0

# Copy custom web frontend
COPY web/dist /ragflow/web/dist

# Copy configuration
COPY docker/nginx/ragflow.conf /etc/nginx/conf.d/ragflow.conf
COPY docker/service_conf.yaml.template /ragflow/conf/service_conf.yaml.template

# Expose ports
EXPOSE 80 443 9380 9381

# Start command
CMD ["bash", "/ragflow/entrypoint.sh"]
