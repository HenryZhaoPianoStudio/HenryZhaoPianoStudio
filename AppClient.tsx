
'use client';
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Lock, PlayCircle, Video, Images, Music2, GraduationCap, ShieldCheck, Info, LogIn, User, Check } from "lucide-react";

// ===== Mock Auth / Paywall State =====
// paid = true 代表已完成“一个月学费”解锁；实际项目中应由后端判定并返回
function useMockAuth() {
  const [authed, setAuthed] = useState(false);
  const [paid, setPaid] = useState(false);
  return { authed, setAuthed, paid, setPaid };
}

// ===== Mock Data =====
const demoTracks = [
  { id: 1, title: "音阶示范：C大调", level: "初级", locked: true },
  { id: 2, title: "哈农练习 No.1", level: "基础技巧", locked: true },
  { id: 3, title: "拜厄 39", level: "入门", locked: true },
  { id: 4, title: "小汤 进行曲", level: "儿童", locked: true },
  { id: 5, title: "车尔尼 599-30", level: "进阶", locked: true },
  { id: 6, title: "巴赫 小步舞曲", level: "古典", locked: true },
];

const studentVideos = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `学员演奏 ${i + 1}`,
  cover: `https://picsum.photos/seed/student${i + 1}/600/400`,
}));

const certificates = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/seed/cert${i + 1}/800/600`,
  caption: `等级考试证书 #${i + 1}`,
}));

// ===== UI Helpers =====
function Section({ id, icon, title, subtitle, children }: any) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl font-semibold flex items-center gap-3"
      >
        {icon}
        {title}
      </motion.h2>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-gray-600">{subtitle}</p>
      )}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Card({ children }: any) {
  return (
    <div className="rounded-2xl shadow-sm border p-4 bg-white/70 hover:shadow-md transition">
      {children}
    </div>
  );
}

function Pill({ children }: any) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">{children}</span>
  );
}

// ===== Main App =====
export default function App() {
  const { authed, setAuthed, paid, setPaid } = useMockAuth();

  const locked = !paid; // 未付费即锁定教学演示曲目

  const heroStats = useMemo(() => [
    { label: "线下校区", value: "LA / SGV" },
    { label: "在读学员", value: "120+" },
    { label: "考级通过率", value: "98%" },
  ], []);

  return (
    <div className="min-h-screen text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <a href="#home" className="font-semibold text-lg">HZ Music Studio</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#tracks" className="hover:opacity-80">教材示范</a>
            <a href="#videos" className="hover:opacity-80">学生视频</a>
            <a href="#certs" className="hover:opacity-80">考级证书</a>
            <a href="#about" className="hover:opacity-80">关于我</a>
            <a href="#pricing" className="hover:opacity-80">报名/解锁</a>
          </nav>
          <div className="flex items-center gap-3">
            {authed ? (
              <Pill><User className="w-4 h-4 mr-1"/>已登录</Pill>
            ) : (
              <button onClick={() => setAuthed(true)} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-gray-50"><LogIn className="w-4 h-4"/> 登录</button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="pt-10 sm:pt-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-4 sm:px-6 lg:px-8 items-center">
          <div>
            <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} className="text-3xl sm:text-4xl font-bold leading-tight">
              线下招生 · 专业钢琴教学
            </motion.h1>
            <p className="mt-3 text-gray-600">
              系统教材 · 分级示范 · 考级辅导 · 舞台实践。报名并完成<strong>一个月学费</strong>即可解锁教材全套<strong>示范视频</strong>与<strong>伴奏下载</strong>（受保护）。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {heroStats.map((s) => (
                <div key={s.label} className="rounded-2xl border bg-white/70 px-4 py-3">
                  <div className="text-xl font-semibold">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <a href="#pricing" className="inline-flex items-center rounded-2xl px-5 py-3 border text-sm font-medium hover:bg-gray-50">马上报名/解锁</a>
              <a href="#videos" className="inline-flex items-center rounded-2xl px-5 py-3 border text-sm font-medium hover:bg-gray-50">观看学生演奏</a>
            </div>
          </div>
          <div>
            <div className="aspect-video rounded-2xl overflow-hidden border relative bg-black/5 flex items-center justify-center">
              <PlayCircle className="w-16 h-16"/>
              <span className="absolute bottom-3 left-3 text-xs bg-white/80 rounded-full px-2 py-1">宣传片占位</span>
            </div>
            <div className="mt-3 text-xs text-gray-500 flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> 解锁内容受 DRM/水印与账号校验保护（示意）。</div>
          </div>
        </div>
      </section>

      {/* Tracks (Paywalled) */}
      <section id="tracks" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3">
          <Music2 className="w-6 h-6"/>
          <h2 className="text-2xl sm:text-3xl font-semibold">教材曲目示范（解锁后可看全片）</h2>
        </div>
        <p className="mt-2 text-sm sm:text-base text-gray-600">报名并完成一个月学费后自动解锁账号，手机/平板/电脑均可学习。</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {demoTracks.map((t) => (
            <div key={t.id} className="rounded-2xl shadow-sm border p-4 bg-white/70 hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center border">
                  <Music2 className="w-6 h-6"/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{t.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{t.level}</div>
                </div>
                {locked ? (
                  <div className="flex items-center gap-1 text-gray-500"><Lock className="w-4 h-4"/>锁定</div>
                ) : (
                  <div className="flex items-center gap-1 text-emerald-600"><Check className="w-4 h-4"/>已解锁</div>
                )}
              </div>
              <div className="mt-3 flex gap-2">
                <button className="rounded-xl border px-3 py-2 text-xs hover:bg-gray-50 inline-flex items-center gap-1"><Video className="w-4 h-4"/> 试看</button>
                <button disabled={locked} className={`rounded-xl border px-3 py-2 text-xs inline-flex items-center gap-1 ${locked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}><PlayCircle className="w-4 h-4"/> 全片</button>
              </div>
            </div>
          ))}
        </div>
        {locked && (
          <div className="mt-6 text-sm text-gray-600">
            完整曲目、指法讲解与伴奏下载为付费内容。请前往 <a href="#pricing" className="underline">报名/解锁</a>。
          </div>
        )}
      </section>

      {/* Student Videos */}
      <section id="videos" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3">
          <PlayCircle className="w-6 h-6"/>
          <h2 className="text-2xl sm:text-3xl font-semibold">学生演奏视频</h2>
        </div>
        <p className="mt-2 text-sm sm:text-base text-gray-600">真实课堂与音乐会实录，家长许可后公开展示。</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {studentVideos.map((v) => (
            <div key={v.id} className="rounded-2xl shadow-sm border p-4 bg-white/70 hover:shadow-md transition">
              <div className="aspect-video rounded-xl overflow-hidden border bg-gray-100">
                <img src={v.cover} alt={v.title} className="w-full h-full object-cover"/>
              </div>
              <div className="mt-2 text-sm font-medium">{v.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates */}
      <section id="certs" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3">
          <Images className="w-6 h-6"/>
          <h2 className="text-2xl sm:text-3xl font-semibold">考级荣誉与证书墙</h2>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((c) => (
            <div key={c.id} className="rounded-2xl shadow-sm border p-4 bg-white/70 hover:shadow-md transition">
              <div className="rounded-xl overflow-hidden border bg-gray-100">
                <img src={c.image} alt={c.caption} className="w-full h-full object-cover"/>
              </div>
              <div className="mt-2 text-sm">{c.caption}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3">
          <Info className="w-6 h-6"/>
          <h2 className="text-2xl sm:text-3xl font-semibold">关于我</h2>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl shadow-sm border p-4 bg-white/70 hover:shadow-md transition">
            <h3 className="font-semibold">教育背景</h3>
            <p className="text-sm text-gray-600 mt-2">中央音乐学院 · 钢琴表演；10+年教学；专注技术基础与音乐表现力。</p>
          </div>
          <div className="rounded-2xl shadow-sm border p-4 bg-white/70 hover:shadow-md transition">
            <h3 className="font-semibold">教学特色</h3>
            <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
              <li>分级教材与阶段目标</li>
              <li>课堂录视频复盘</li>
              <li>舞台实践 + 考级规划</li>
            </ul>
          </div>
          <div className="rounded-2xl shadow-sm border p-4 bg-white/70 hover:shadow-md transition">
            <h3 className="font-semibold">校区与上课时间</h3>
            <p className="text-sm text-gray-600 mt-2">LA/SGV 区域线下授课；工作日放学后 & 周末全天。</p>
          </div>
        </div>
      </section>

      {/* Pricing / Unlock */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-6 h-6"/>
          <h2 className="text-2xl sm:text-3xl font-semibold">报名与内容解锁</h2>
        </div>
        <p className="mt-2 text-sm sm:text-base text-gray-600">完成一个月线下学费后，系统将为您的账号解锁全部教材示范（当月有效，可连续月续费保持可见）。</p>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl shadow-sm border p-4 bg-white/70 hover:shadow-md transition">
            <h3 className="font-semibold text-lg">线下课程（必选）</h3>
            <ul className="mt-3 text-sm text-gray-700 space-y-2">
              <li>• 一对一 45 分钟 × 4 节 / 月</li>
              <li>• 课堂录制回放与作业清单</li>
              <li>• 报名当月即解锁示范库</li>
            </ul>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">$XXX / 月</div>
                <div className="text-xs text-gray-500">线下支付或在线支付</div>
              </div>
              <button onClick={() => setPaid(true)} className="rounded-2xl border px-5 py-3 text-sm hover:bg-gray-50">完成支付（示意）</button>
            </div>
          </div>
          <div className="rounded-2xl shadow-sm border p-4 bg-white/70 hover:shadow-md transition">
            <h3 className="font-semibold text-lg">会员权限</h3>
            <ul className="mt-3 text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5"/> 全套示范视频（当月解锁）</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5"/> 伴奏/谱例与下载水印</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5"/> 作业点评与每周练习目标</li>
            </ul>
            <div className="mt-4 text-xs text-gray-500">* 示范内容加密并绑定账号；严禁外传。</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-gray-600">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} HZ Music Studio</div>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="underline">隐私政策</a>
              <a href="#" className="underline">家长/学生授权与肖像使用协议</a>
              <a href="#" className="underline">退款与停课规则</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
