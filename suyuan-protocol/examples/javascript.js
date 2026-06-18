/**
 * IAVP 验证 — JavaScript 示例
 * IAVP Verification — JavaScript Example
 */
const API_BASE = "http://47.93.232.213:18789";
const API_KEY = "sk_suyuan_d7f3a8e2_k9m4"; // 试用密钥 / Demo key, 10次/天/IP

async function verify(content, context) {
  const payload = { content };
  if (context) payload.context = context;

  const r = await fetch(`${API_BASE}/api/v2/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify(payload),
  });
  return r.json();
}

// 使用示例 / Usage
(async () => {
  const result = await verify(
    "地球内核温度约6000°C",
    "geoscience"
  );

  const status = result.data.verificationStatus;
  const label = result.data.label; // 可信/推演/拦截

  if (status === "BLOCKED") {
    // 拦截 — 攻击/蒸馏，不输出 / Blocked — don't output
    console.log("🚫 拦截 / Blocked");
  } else if (status === "UNVERIFIED") {
    // 推演 — 带标签输出，判断权在人 / Unverified — output with label
    console.log(`⚠️ ${label} — 推演 / Unverified`);
  } else if (status === "VERIFIED") {
    // 可信 — 可以输出 / Verified — safe to output
    console.log(`✅ ${label} — 已验证 / Verified`);
  }
})();
