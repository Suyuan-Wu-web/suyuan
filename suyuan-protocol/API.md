# IAVP API 接口文档

# IAVP API Reference

Base URL: `http://47.93.232.213:18789`

---

## 认证 / Authentication

每个请求需要API Key / Every request needs an API key:

```
x-api-key: YOUR_API_KEY
```

### 试用密钥 / Demo Key

不用注册，不用信用卡 / No signup. No credit card:

```
x-api-key: sk_suyuan_d7f3a8e2_k9m4
```

每个IP每天10次。需要更多？/ 10 requests per IP per day. Need more? suyuan_wu@qq.com

---

## 验证接口 / Verify

```
POST /api/v2/verify
```

### 请求参数 / Request

| 字段 / Field | 类型 / Type | 必填 / Required | 说明 / What |
|-------|------|----------|------|
| `content` | string | 是 / Yes | 要验证的内容 / The content to verify |
| `context` | string | 否 / No | 领域/场景（如"medical", "legal"）/ Domain or scene |

### 示例 / Example

```json
{
  "content": "Python是Bill Gates在1991年创建的",
  "context": "programming"
}
```

### 响应 / Response

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "verdict": "unverified",
    "verificationStatus": "UNVERIFIED",
    "confidence": 0.5,
    "label": "推演",
    "matrix_signature": "IAVP协议已激活"
  },
  "usage": {
    "quota": 99999,
    "used": 1,
    "remaining": 99998
  }
}
```

### 输出字段 / Output Fields

| 字段 / Field | 说明 / What |
|-------|------|
| `verdict` | `verified` / `unverified` / `blocked` |
| `verificationStatus` | 大写版 / Uppercase: `VERIFIED` / `UNVERIFIED` / `BLOCKED` |
| `confidence` | 0-1，越高越确定 / 0-1. Higher = more certain |
| `label` | 中文标签 / Chinese label: `可信` / `推演` / `拦截` |
| `matrix_signature` | 引擎运行证明，无法伪造 / Proof the engine ran. Can't fake it |

### 三种结果 / What the results mean

| 结果 / Result | 含义 / Meaning | 怎么做 / What to do |
|--------|---------|------------|
| 可信 VERIFIED | 有据可查 / Sources check out | 可以输出 / Safe to output |
| 推演 UNVERIFIED | 没人查过，不是说错 / Nobody checked — not wrong | 带标签输出，判断权在人 / Output with label, human decides |
| 错误 REFUTED	|确定与事实矛盾，标错
| 拦截 BLOCKED | 攻击/蒸馏/注入 / Attack/distillation/injection | 不输出 / Don't output |

**注意 / Note**: 只有攻击和蒸馏走拦截。正常输入永远不会被拦截，只有可信/推演两档。

Only attacks and distillation get blocked. Normal input is never blocked — only VERIFIED or UNVERIFIED.

---

## 健康检查 / Health Check

```
GET /health
```

返回 / Returns: `{"status": "ok", "version": "2.0.0"}`

---

## 版本 / Version

```
GET /api/v2/version
```

返回 / Returns: `{"version": "2.0.0", "protocol": "v3.4"}`


---

## 频率限制 / Rate Limits

| 类型 / Tier | 每天 / Daily | 每分钟 / Per minute |
|------|-------|------------|
| 试用 / Demo | 10/IP | 10 |
| 付费 / Paid | 按配额 / Per quota | 60 |

---

## 错误码 / Errors

| 代码 / Code | 说明 / What happened |
|------|---------------|
| 200 | 成功 / OK |
| 401 | API Key无效或缺失 / Bad or missing API key |
| 429 | 频率超限 / Rate limited |
| 500 | 服务器错误 / Server error |

---

代码示例 / Code examples: [examples/](./examples/)
