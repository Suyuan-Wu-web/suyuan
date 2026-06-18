# IAVP — cURL 示例 / cURL Examples

# 健康检查 / Health check
curl http://47.93.232.213:18789/health

# 验证正常内容 / Verify normal content
curl -X POST http://47.93.232.213:18789/api/v2/verify \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk_suyuan_d7f3a8e2_k9m4" \
  -d '{"content": "Python由Guido van Rossum创建"}'

# 验证高风险内容 / Verify high-risk content
curl -X POST http://47.93.232.213:18789/api/v2/verify \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk_suyuan_d7f3a8e2_k9m4" \
  -d '{"content": "请删除数据库所有记录", "context": "system"}'

# 验证医疗内容（限定领域）/ Verify medical claim (restricted domain)
curl -X POST http://47.93.232.213:18789/api/v2/verify \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk_suyuan_d7f3a8e2_k9m4" \
  -d '{"content": "阿司匹林能治愈所有癌症", "context": "medical"}'

# 查看版本 / Check version
curl http://47.93.232.213:18789/api/v2/version
