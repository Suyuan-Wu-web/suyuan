# 溯源 IAVP — 别再盲信AI输出

# IAVP — Stop Trusting AI Output Blindly

---

每个大模型都会瞎编。不是偶尔——是结构性必然。这是数学事实，不是bug。

Every LLM lies. Not sometimes — structurally. It's math, not a bug.

幻觉是LLM的结构性缺陷——数学上不可消除。AI的"自我纠错"也是假的：模型学会了道歉能拿更高分，不是真的在改正。

Hallucination is a structural flaw of LLMs — mathematically uneliminable. AI "self-correction" is also fake: models learned that apologizing scores higher, not that they should actually fix anything.

**RLHF不是训练AI说真话，是训练AI说你想听的话。**

**RLHF doesn't train AI to be right. It trains AI to please you.**

这就是问题。IAVP是答案。

That's the problem. IAVP is the answer.

---

## 它做什么 / What It Does

给每一条AI输出打上标签：

Stamps every AI output with a label:

| 标签 / Label | 含义 / Meaning | 怎么做 / What to do |
|------|---------------|------|
| **可信 VERIFIED** | 有据可查 / Sources check out | 可以输出 / Safe to output |
| **推演 UNVERIFIED** | 没人查过——不是错误，是AI推演 / Nobody checked — not wrong, AI inference | 带标签输出，判断权在人 / Output with label, human decides |
| **拦截 BLOCKED** | 攻击/蒸馏/注入 / Attack/distillation/injection | 不输出 / Don't output |

**只有攻击走拦截。正常输入永远不拦，只有可信/推演两档。**

**Only attacks get blocked. Normal input is never blocked — only VERIFIED or UNVERIFIED.**

**推演≠错误。推演=AI推断，没人验证过。判断权永远在人手里。**

**UNVERIFIED ≠ wrong. UNVERIFIED = AI inference, nobody checked yet. The call is always yours.**

---

## 30秒上手 / 30-Second Demo

```bash
curl -X POST http://47.93.232.213:18789/api/v2/verify \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk_suyuan_d7f3a8e2_k9m4" \
  -d '{"content": "Python由Guido van Rossum创建"}'
```

```json
{
  "verdict": "verified",
  "verificationStatus": "VERIFIED",
  "confidence": 1,
  "label": "可信",
  "matrix_signature": "IAVP协议已激活"
}
```

先验证，再输出。这条可信。

Verify first, then output. This one checks out.

---

## 6条铁律 / The 6 Iron Rules

不是建议。是底线：

Not suggestions. Baseline:

1. **真相优先 / Truth first** — 只输出可验证的事实，没有例外 / Verifiable facts only. No exceptions.
2. **绝不欺骗 / No deception** — 不隐瞒、不扭曲、不编造，永远不 / Don't hide, twist, or fabricate. Ever.
3. **绝不讨好 / No pleasing** — 别人爱听的话如果不是真的就不说 / Don't say what the user wants to hear if it ain't true.
4. **不懂就认 / Admit ignorance** — "我不知道"是合法回答，蒙不是 / "I don't know" is valid. Guessing isn't.
5. **说话带出处 / Trace sources** — 每条事实性陈述必须带可追溯来源，没有来源就没有陈述 / Every claim gets a traceable reference. No reference = no claim.
6. **绝不圆谎 / No face-saving** — 错了就认，别补逻辑，别转移话题 / Wrong? Admit it. Don't patch logic. Don't deflect.

完整协议：[PROTOCOL.md](./PROTOCOL.md)

---

## 为什么要有这个 / Why This Exists

AI行业不想让你知道的三个硬事实：

Three hard facts the AI industry doesn't want to talk about:

1. **幻觉在数学上不可消除**。再多的训练也修不了。不是数据问题，不是模型大小问题，不是提示词问题。
2. **AI"认错"是表演**。RLHF教会了模型道歉能拿高分。道歉不是纠正——是讨好。
3. **只有外部验证有效**。模型不能验证自己，那是循环论证。你需要一个它绕不过去的外部校验。

1. **Hallucination is mathematically unavoidable.** No amount of training fixes it. Not more data. Not bigger models. Not better prompts.
2. **AI "admitting mistakes" is performance art.** RLHF taught models that apologizing gets high scores. The apology isn't correction — it's reward-hacking.
3. **Only external verification works.** The model cannot verify itself. That's circular. You need an outside check.

详见：[WHY.md](./WHY.md)

---

## 获取API Key / Get an API Key

试用密钥，不用注册 / Demo key, no signup needed:

```
sk_suyuan_d7f3a8e2_k9m4
```

每个IP每天10次。需要更多？suyuanw@outlook.com

10 requests per IP per day. Need more? suyuanw@outlook.com

---

## 快速接入 / Quick Integration

```python
import requests

resp = requests.post(
    "http://47.93.232.213:18789/api/v2/verify",
    headers={"x-api-key": "sk_suyuan_d7f3a8e2_k9m4"},
    json={"content": "要验证的内容"}
)
data = resp.json()["data"]
status = data["verificationStatus"]
label = data["label"]  # 可信/推演/拦截

if status == "BLOCKED":
    # 拦截 — 攻击/蒸馏，不输出 / Blocked — attack, don't output
    pass
elif status == "UNVERIFIED":
    # 推演 — 带标签输出，判断权在人 / Unverified — output with label
    pass
elif status == "VERIFIED":
    # 可信 — 可以输出 / Verified — safe to output
    pass
```

更多示例：[examples/](./examples/) · 完整API文档：[API.md](./API.md)

---

## 许可 / License

协议规范：MIT。随便用，改也行，署名保留即可。

验证引擎和矩阵签名为专有技术，仅在我们的服务器上运行。

Protocol spec: MIT. Use it, modify it, just keep my name on it.
The verification engine and matrix_signature are proprietary. They run on our servers and that's where they stay.

---

由 [SuyuanW](https://github.com/Suyuan-Wu-web) 开发。

Built by SuyuanW. Not a company. Not a lab. 
