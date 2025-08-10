"use client"

import type React from "react"
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Crown,
  Gem,
  Play,
  Rocket,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  ListChecks,
  Settings,
  Boxes,
  Cpu,
  LinkIcon,
  HelpCircle,
  Clock,
  ClipboardCheck,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useActionState } from "react"
import { useToast } from "@/hooks/use-toast"
import { registerSeminar, type SeminarRegistrationState } from "./actions/register-seminar"

const serifStyle = { fontFamily: "'Playfair Display', serif" }

function useCountdown(targetISO: string) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO])
  const [now, setNow] = useState<number>(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, target - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, done: diff <= 0 }
}

function Countdown({
  target = "2025-09-01T00:00:00+09:00",
  size = "md",
}: {
  target?: string
  size?: "sm" | "md" | "lg"
}) {
  const { days, hours, minutes, seconds } = useCountdown(target)
  const base = "tabular-nums font-bold tracking-wide"
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl md:text-3xl",
  } as const
  return (
    <div className={`flex items-center gap-3 text-amber-400 ${sizes[size]} ${base}`} aria-label="カウントダウン">
      <TimeBox label="日" value={days} />
      <span className="text-amber-500/60">:</span>
      <TimeBox label="時" value={hours} />
      <span className="text-amber-500/60">:</span>
      <TimeBox label="分" value={minutes} />
      <span className="text-amber-500/60">:</span>
      <TimeBox label="秒" value={seconds} />
    </div>
  )
}

function TimeBox({ label, value }: { label: string; value: number }) {
  const v = String(value).padStart(2, "0")
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-md border border-amber-400/30 bg-black/40 px-2 py-1 md:px-3 md:py-1.5 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.08)]">
        <span className="text-amber-300">{v}</span>
      </div>
      <span className="mt-1 text-[10px] text-amber-200/60">{label}</span>
    </div>
  )
}

export default function DeepBaySeminarLuxuryLP() {
  const { toast } = useToast()
  const [state, formAction, isPending] = useActionState<SeminarRegistrationState, FormData>(registerSeminar, null)
  const [open, setOpen] = useState(false)
  const [consultOpen, setConsultOpen] = useState(false)

  useEffect(() => {
    if (state?.success) {
      toast({ title: "お申し込み完了", description: state.message })
      setOpen(false)
      setConsultOpen(false)
    } else if (state && !state.success) {
      toast({ title: "送信に失敗しました", description: state.message, variant: "destructive" })
    }
  }, [state, toast])

  return (
    <div className="relative bg-black text-slate-200">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');
          .font-serif { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
          .sheen { position: relative; display: inline-block; overflow: hidden; }
          .sheen::after {
            content: ''; position: absolute; inset: -200% -20%;
            background: linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.15), transparent 60%);
            transform: translateX(-100%); animation: sheen 6s linear infinite;
          }
          @keyframes sheen { 0% { transform: translateX(-100%);} 60% { transform: translateX(100%);} 100% { transform: translateX(100%);} }
          .aurora {
            background:
              radial-gradient(1200px 600px at 10% 10%, rgba(251,191,36,0.08), transparent 55%),
              radial-gradient(900px 450px at 90% 20%, rgba(234,179,8,0.06), transparent 55%),
              radial-gradient(1000px 520px at 50% 110%, rgba(245,158,11,0.08), transparent 55%);
          }
          .keycap {
            display:inline-flex; align-items:center; justify-content:center;
            border:1px solid rgba(251,191,36,0.4);
            background: rgba(17,17,17,0.6);
            border-radius:8px; padding:0 8px; height:28px; min-width:28px;
            font-weight:600; color:#facc15;
            box-shadow: inset 0 0 0 1px rgba(251,191,36,0.08);
          }
        `}
      </style>

      {/* Film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.06] mix-blend-soft-light"
        style={{ backgroundImage: "url(/images/noise.png)" }}
      />

      {/* Sticky top bar */}
      <div className="sticky top-0 z-40 border-b border-amber-400/15 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <Gem className="h-5 w-5 text-amber-400" />
            <span className="text-xs text-slate-300"> 9月1日〜7日 集中ライブ</span>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Countdown size="sm" />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full bg-amber-400 px-5 text-black hover:bg-amber-300">今すぐ申し込む</Button>
              </DialogTrigger>
              <SeminarDialogContent isPending={isPending} formAction={formAction} state={state} />
            </Dialog>
          </div>
        </div>
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden">
        {/* Premium hero background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/hero-luxury-marble.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.35,
          }}
          aria-hidden="true"
        />
        <div className="aurora absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black/80" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-28 md:pt-36">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-black/40 px-3 py-1 text-xs text-amber-300">
            <Calendar className="h-3.5 w-3.5" />
            {"9月1日〜7日 第1回集中ライブ | 9月23日〜30日 第2回集中ライブ"}
          </div>
          <h1 className="sheen text-5xl font-bold leading-tight text-slate-50 md:text-7xl" style={serifStyle}>
            DeepBay Seminar
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-300 md:text-xl">
            従来の一般的なツールの制約を超える新世代『DeepBay』のすべてを、ラグジュアリーな体験とともに。
            機能・価格・将来性、その本質を余すことなく公開します。
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full bg-amber-400 px-8 py-7 text-lg font-bold text-black hover:bg-amber-300">
                  <Calendar className="mr-2 h-5 w-5" />
                  セミナーに申し込む
                </Button>
              </DialogTrigger>
              <SeminarDialogContent isPending={isPending} formAction={formAction} state={state} />
            </Dialog>
            <a href="#comparison">
              <Button
                variant="outline"
                className="rounded-full border-amber-400 px-8 py-7 text-lg font-semibold text-amber-400 hover:bg-amber-400 hover:text-black bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                従来ツールとの違いを見る
              </Button>
            </a>
          </div>
          <div className="mt-10">
            <span className="text-xs tracking-widest text-amber-200/70">セミナー開始まで</span>
            <div className="mt-2">
              <Countdown size="lg" />
            </div>
          </div>

          {/* 画像ストリップ削除済み */}
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-28 px-4 py-24">
        {/* Seminar Series */}
        <section id="seminar">
          <div className="mb-10 text-center">
            <img
              src="/images/DeepBay.png"
              alt="DeepBay セミナー バナー"
              className="mx-auto mb-6 md:mb-10 w-full max-w-5xl rounded-md object-contain"
              loading="eager"
              decoding="async"
              onError={(e) => {
                const img = e.currentTarget
                img.src = '/images/value-banner.png'
              }}
            />
            <h2 className="text-4xl font-bold text-slate-50 md:text-5xl" style={serifStyle}>
              Exclusive Seminar
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-slate-400">
              DeepBayの全貌を、徹底解説。参加費無料・アーカイブ配信数日間あり。
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="overflow-hidden border-amber-400/40 bg-zinc-900">
              <img
                src="/images/seminar-1.png"
                alt="移行戦略セミナーのキービジュアル"
                className="h-44 w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/15 text-amber-400">
                  <Calendar className="h-8 w-8" />
                </div>
                <CardTitle className="text-amber-400" style={serifStyle}>
                  第1弾：集中ライブ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-300">
                <p className="text-center text-lg font-semibold">9月1日〜7日 集中開催</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Star className="mr-2 mt-1 h-5 w-5 text-amber-400" />
                    {"DeepBayの全機能のご案内"}
                  </li>
                  <li className="flex items-start">
                    <Star className="mr-2 mt-1 h-5 w-5 text-amber-400" />
                    {"従来ツールの徹底比較・Q&A"}
                  </li>
                  <li className="flex items-start">
                    <Star className="mr-2 mt-1 h-5 w-5 text-amber-400" />
                    {"ベストプラクティス講座"}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-amber-400/40 bg-zinc-900">
              <img
                src="/images/seminar-1.png"
                alt="活用法マスタークラスのキービジュアル"
                className="h-44 w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/15 text-amber-400">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <CardTitle className="text-amber-400" style={serifStyle}>
                  第2弾：集中ライブ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-300">
                <p className="text-center text-lg font-semibold">9月23日〜30日 集中開催</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Star className="mr-2 mt-1 h-5 w-5 text-amber-400" />
                    {"DeepBayの全機能のご案内"}
                  </li>
                  <li className="flex items-start">
                    <Star className="mr-2 mt-1 h-5 w-5 text-amber-400" />
                    {"従来ツールの徹底比較・Q&A"}
                  </li>
                  <li className="flex items-start">
                    <Star className="mr-2 mt-1 h-5 w-5 text-amber-400" />
                    {"ベストプラクティス講座"}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Timing details from transcript */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="border-amber-400/20 bg-zinc-900/60">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-amber-300">
                  <Clock className="h-5 w-5" />
                  開催時間（9/1〜9/7）
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <ul className="ml-4 list-disc space-y-1">
                  <li>土日：13時頃／20時頃の2回</li>
                  <li>平日：20時開始</li>
                  <li className="text-slate-500 text-sm">録画は数日間のみ公開予定</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-amber-400/20 bg-zinc-900/60">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-amber-300">
                  <Calendar className="h-5 w-5" />
                  追加スケジュール
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <ul className="ml-4 list-disc space-y-1">
                  <li>8月下旬：9月セミナー案内の送付</li>
                  <li>9/23〜9/30：追加ライブ配信</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-amber-400/20 bg-zinc-900/60">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-amber-300">
                  <ClipboardCheck className="h-5 w-5" />
                  30分 個別ミーティング
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <p>9月LIVEにどうしても参加できない方や不安な方は、期間中はご希望者に個別相談をご用意しています。</p>
                <Dialog open={consultOpen} onOpenChange={setConsultOpen}>
                  <DialogTrigger asChild>
                    
                  </DialogTrigger>
                  <ConsultDialogContent isPending={isPending} formAction={formAction} state={state} />
                </Dialog>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 text-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full bg-amber-400 px-10 py-7 text-lg font-bold text-black hover:bg-amber-300">
                  今すぐセミナーに申し込む
                </Button>
              </DialogTrigger>
              <SeminarDialogContent isPending={isPending} formAction={formAction} state={state} />
            </Dialog>
            <p className="mt-3 text-sm text-slate-500">何回でも参加申し込み可能です</p>
          </div>
        </section>

        {/* Comparison & Plans */}
        <section id="comparison">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-slate-50 md:text-5xl" style={serifStyle}>
              従来ツールと比べた、絶対的進化
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-slate-400">
              料金は据え置きで、依頼回数は大幅アップ。従来では有料のことが多い機能も標準化。
            </p>
          </div>

          {/* Visual banner for premium value */}
          <div className="mb-8 overflow-hidden rounded-xl border border-amber-400/20">
            <img
              src="/images/value-banner.png"
              alt="価値の向上を象徴するゴールドの光の軌跡"
              className="aspect-[21/9] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-slate-800 bg-zinc-900/70">
              <CardHeader>
                <CardTitle className="text-center text-slate-400">従来ツール（一般的な構成例）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-300 leading-relaxed text-[15px] sm:text-base">
                <p>スタンダード：月50回程度</p>
                <p>プレミアム：月500回程度</p>
                <p>抽出対象件数：600件程度</p>
                <p>27日経過許可：有料オプション</p>
                <p>追加サイト数：有料オプション</p>
              </CardContent>
            </Card>
            <Card className="border-amber-400/40 bg-zinc-950/80 shadow-lg shadow-amber-900/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-amber-400">
                  <Crown className="mr-2 h-6 w-6" />
                  DeepBay（新世代）
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-100 leading-relaxed text-[15px] sm:text-base">
                <p className="flex items-center font-medium">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-amber-400" />
                  {"スタンダード：100回/月（従来比2倍の目安）"}
                </p>
                <p className="flex items-center font-medium">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-amber-400" />
                  {"ハイスタンダード：150回/月"}
                </p>
                <p className="flex items-center font-medium">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-amber-400" />
                  {"プレミアム：600回/月（従来比2倍の目安）"}
                </p>
                <p className="flex items-center font-medium">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-amber-400" />
                  {"抽出対象件数（アンカー）：800件（+200件の目安）"}
                </p>
                <p className="flex items-center font-medium">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-amber-400" />
                  {"27日経過許可：在庫管理オプション標準搭載"}
                </p>
                <p className="flex items-center font-medium">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-amber-400" />
                  {"追加サイト数拡大：無料"}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-amber-400/20 bg-zinc-900/50">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-amber-400/20">
                  <TableHead className="py-4 text-slate-300">プラン</TableHead>
                  <TableHead className="py-4 text-center text-slate-500">従来ツール（例）</TableHead>
                  <TableHead className="py-4 text-center text-amber-400">DeepBay</TableHead>
                  <TableHead className="py-4 text-center text-green-400">目安の向上率</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { plan: "スタンダード", legacy: "50回", deepbay: "100回", rate: "200%程度" },
                  { plan: "ハイスタンダード", legacy: "100回", deepbay: "150回", rate: "150%程度" },
                  { plan: "プレミアム", legacy: "300回", deepbay: "600回", rate: "200%程度" },
                  { plan: "アンカー（抽出）", legacy: "600件", deepbay: "800件", rate: "133%程度" },
                ].map((r) => (
                  <TableRow key={r.plan} className="border-b border-slate-800 last:border-b-0">
                    <TableCell className="py-3 text-slate-200">{r.plan}</TableCell>
                    <TableCell className="py-3 text-center text-slate-500">{r.legacy}</TableCell>
                    <TableCell className="py-3 text-center font-semibold text-amber-400">{r.deepbay}</TableCell>
                    <TableCell className="py-3 text-center font-semibold text-green-400">{r.rate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">
            記載の従来値は一般的な構成例・目安であり、各社の仕様により異なります。プラン内容・対応サイト数は予告なく変更される場合があります。
          </p>
        </section>

        {/* Value Highlights */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-slate-50 md:text-5xl" style={serifStyle}>
              価値の再定義：有料の機能を標準化
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-slate-400">
              27日経過許可・高度在庫管理など、一般的に有料のことが多い機能を標準搭載。
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <ValueCard
              icon={<Award className="h-10 w-10 text-amber-400" />}
              title="27日経過許可"
              caption="一般的に有料オプションのことが多い → DeepBayは標準"
              body="長期在庫の制限を撤廃し、販売戦略の自由度を確保。"
            />
            <ValueCard
              icon={<Users className="h-10 w-10 text-amber-400" />}
              title="アカウント紐付け"
              caption="一般的に有料オプションのことが多い → DeepBayは完全無料"
              body="複数アカウントの一元管理でスケールを加速。"
            />
            <ValueCard
              icon={<ShieldCheck className="h-10 w-10 text-amber-400" />}
              title="高度在庫管理"
              caption="優先・最優先・積み上げ（オプション）"
              body="在庫戦略を高度化し、売り逃しゼロへ。"
            />
          </div>
        </section>

        {/* Pro Feature Highlights from transcript */}
        <section id="pro-features">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-slate-50 md:text-5xl" style={serifStyle}>
              プロ向け機能アップデート
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-slate-400">
              第3回シークレットライブで共有した、移行に効く実践的アップデートをピックアップ。
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-amber-400/20 bg-zinc-900/60">
              <CardHeader>
                <CardTitle className="text-amber-300">最優先／優先 在庫管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-slate-300">
                <ul className="ml-4 list-disc space-y-1">
                  <li>ウォッチ付き商品は1日2〜3回など複数回の在庫管理に対応</li>
                  <li>出品日数・ビュー数・ウォッチ数等で優先対象を自動リスト化</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-amber-400/20 bg-zinc-900/60">
              <CardHeader>
                <CardTitle className="text-amber-300">操作性とスピード</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-slate-300">
                <ul className="ml-4 list-disc space-y-1">
                  <li>サクサク動く高速処理・レスポンス改善</li>
                  <li>画像プレビューのピクセル単位調整</li>
                  <li>自動スクロール（速度調整）で編集効率アップ</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-amber-400/20 bg-zinc-900/60">
              <CardHeader>
                <CardTitle className="text-amber-300">ショートカットキー</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-300">
                <div className="grid gap-2 sm:grid-cols-2">
                  <KeycapRow keyLabel="Space" desc="画像削除" />
                  <KeycapRow keyLabel="V" desc="前ページ" />
                  <KeycapRow keyLabel="C" desc="次ページ" />
                  <KeycapRow keyLabel="X" desc="先頭画像削除" />
                </div>
                <p className="text-xs text-slate-500">編集時の生産性を最大化するための推奨設定もセミナーで解説。</p>
              </CardContent>
            </Card>

            <Card className="border-amber-400/20 bg-zinc-900/60">
              <CardHeader>
                <CardTitle className="text-amber-300">抽出・編集の生産性</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-slate-300">
                <ul className="ml-4 list-disc space-y-1">
                  <li>カテゴリー番号の保存（よく使うカテゴリを登録）</li>
                  <li>除外設定の細分化（全体／依頼ごとを両立）</li>
                  <li>テンプレート機能（依頼パターンの保存・再利用）</li>
                  <li>NOT検索で除外条件を柔軟に指定</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 機能詳細（従来ツール互換セクション） */}
        <section id="features">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-3 flex items-center gap-2">
              <Badge className="bg-amber-400 text-black hover:bg-amber-300">従来ツール互換</Badge>
              <Badge variant="outline" className="border-amber-400 text-amber-400">
                機能拡張
              </Badge>
            </div>
            <h2 className="text-4xl font-bold text-slate-50 md:text-5xl" style={serifStyle}>
              機能詳細
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-slate-400">
              「従来ツールでできることはDeepBayでもできる」ことを示す、詳細な機能一覧です。
            </p>
          </div>

          {/* Visual pairing: content only（画像削除） */}
          <div className="grid items-start gap-8">
            <Card className="border-amber-400/20 bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <ListChecks className="h-6 w-6 text-amber-400" /> はじめに — DeepBayとは
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-300">
                <p>
                  DeepBayはeBay輸出ビジネスを効率化する次世代の出品・在庫管理ツールです。処理速度、機能、使いやすさを包括的に強化しています。
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-1 h-5 w-5 text-amber-400" />
                    18サイト対応：メルカリ／ヤフオク／楽天／オフモール／駿河屋/ラクマ/デジマート/ベクトルーパーク／ブランドオフ／トレファク／スニーカーダンク／ヨドバシカメラ/モノタロウ/
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-1 h-5 w-5 text-amber-400" />
                    高速処理：従来比で大幅なスピード向上
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-1 h-5 w-5 text-amber-400" />
                    チーム連携：外注・社内メンバーと共同編集
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-1 h-5 w-5 text-amber-400" />
                    自動化：自動抽出／自動出品
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-1 h-5 w-5 text-amber-400" />
                    Bee連携：シームレス統合
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 初期設定 + 基本機能 */}
          <div className="mt-8 grid items-start gap-8 md:grid-cols-2">
            <Card className="border-slate-800 bg-zinc-900/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Settings className="h-6 w-6 text-amber-400" /> 初期設定
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300">
                <div>
                  <p className="font-semibold text-amber-300">Step 1: Bee登録</p>
                  <ol className="ml-4 list-decimal space-y-1">
                    <li>Beeにアクセス</li>
                    <li>新規登録 → メールアドレス入力</li>
                    <li>eBayアカウントと連携</li>
                  </ol>
                  <p className="mt-2 text-sm text-slate-400">重要：DeepBayの利用にはBeeの登録が必須です。</p>
                </div>
                <div>
                  <p className="font-semibold text-amber-300">Step 2: DeepBayへログイン</p>
                  <ol className="ml-4 list-decimal space-y-1">
                    <li>DeepBayにアクセス</li>
                    <li>Beeのアカウントでログイン</li>
                    <li>初回セットアップを完了</li>
                  </ol>
                </div>
                <div>
                  <p className="font-semibold text-amber-300">Step 3: 基本設定（除外系）</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>危険セラー：CSVアップロード可</li>
                    <li>危険単語：個別入力 or CSV</li>
                    <li>置換単語：タイトル置換用</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-zinc-900/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Rocket className="h-6 w-6 text-amber-400" /> 基本機能
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300">
                <div>
                  <p className="font-semibold">1. 商品抽出・依頼作成</p>
                  <ol className="ml-4 list-decimal space-y-1">
                    <li>抽出管理 ＞ 一括抽出出品 → 対象URL入力（例：メルカリTシャツ検索）</li>
                    <li>カテゴリー名「Tシャツ」、ID自動補完、出品セラー選択</li>
                    <li>除外条件：選択ワード／価格帯／評価／最終更新日／発送日</li>
                  </ol>
                </div>
                <div>
                  <p className="font-semibold">2. 商品編集</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>画像サイズ調整スライダー／自動スクロール（速度調整）</li>
                    <li>簡易編集モード／詳細編集モードの切替</li>
                    <li>画像削除・タイトル一括編集・価格調整・状態変更</li>
                  </ul>
                  <p className="mt-1 text-sm text-slate-400">
                    チーム連携：編集中表示／マスター権限の担当者解除。編集後は「編集保存」を必ず実行。
                  </p>
                </div>
                <div>
                  <p className="font-semibold">3. 出品処理</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>ダイレクト出品：DeepBay → eBay 即時</li>
                    <li>CSV出品：Specifics In 連携用CSV生成</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 在庫管理（画像削除） */}
          <Card className="mt-8 overflow-hidden border-slate-800 bg-zinc-900/60">
            <div className="grid items-stretch gap-0">
              <div className="p-6">
                <CardHeader className="p-0">
                  <CardTitle className="flex items-center gap-2 text-slate-100">
                    <Boxes className="h-6 w-6 text-amber-400" /> 在庫管理機能
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-0 pt-4 text-slate-300">
                  <div>
                    <p className="font-semibold">基本設定</p>
                    <p className="text-sm text-slate-400">
                      在庫管理 ＞ 設定。対象セラー選択、在庫管理を有効化
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">1. Sold積み上げ</p>
                    <ul className="ml-4 list-disc space-y-1">
                      <li>有効：販売後も在庫0で維持（SEO効果）</li>
                      <li>無効：販売後に自動削除（通常運用）</li>
                    </ul>
                    <p className="mt-1 text-sm text-slate-400">設定手順：積み上げ設定 ＞ アイテムID／URLを登録</p>
                  </div>
                  <div>
                    <p className="font-semibold">2. 価格追従</p>
                    <div className="mt-2 overflow-hidden rounded-md border border-slate-800">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-slate-300">ファイル名</TableHead>
                            <TableHead className="text-slate-300">内容</TableHead>
                            <TableHead className="text-slate-300">用途</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-slate-400">取り下げファイル</TableCell>
                            <TableCell className="text-slate-400">在庫切れ商品リスト</TableCell>
                            <TableCell className="text-slate-400">在庫切れ処理</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-slate-400">価格追従ファイル</TableCell>
                            <TableCell className="text-slate-400">価格変動データ</TableCell>
                            <TableCell className="text-slate-400">価格更新</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-slate-400">在庫更新ファイル</TableCell>
                            <TableCell className="text-slate-400">在庫数変動データ</TableCell>
                            <TableCell className="text-slate-400">在庫数調整</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <ol className="ml-4 mt-2 list-decimal space-y-1">
                      <li>在庫管理画面からダウンロード</li>
                      <li>スプレッドシート等で確認・調整</li>
                      <li>アップロード → eBayへ自動更新</li>
                    </ol>
                  </div>
                  <div>
                    <p className="font-semibold">3. 最優先在庫管理</p>
                    <p className="text-sm text-slate-400">
                      対象商品のチェック頻度を細かく設定（例：プロモ品は1日5回、通常は1日1回）。
                    </p>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>

          {/* 自動化（画像削除） */}
          <Card className="mt-8 overflow-hidden border-slate-800 bg-zinc-900/60">
            <div className="grid items-stretch gap-0">
              <div className="p-6">
                <CardHeader className="p-0">
                  <CardTitle className="flex items-center gap-2 text-slate-100">
                    <Cpu className="h-6 w-6 text-amber-400" /> 自動化機能
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-0 pt-4 text-slate-300">
                  <p className="font-semibold">自動抽出 設定例（推奨値）</p>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>URL：抽出元URL</li>
                    <li>カテゴリー：eBayカテゴリーID</li>
                    <li>出品セラー：メインアカウント</li>
                    <li>タイプ：抽出／出品</li>
                    <li>稼働：ON、出品数：100品／回、実行時間：深夜推奨</li>
                  </ul>
                  <p className="text-sm text-slate-400">自動一括タグが付与され、抽出管理で識別可能。</p>
                </CardContent>
              </div>
            </div>
          </Card>

          {/* 連携（画像削除） */}
          <Card className="mt-8 border-slate-800 bg-zinc-900/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <LinkIcon className="h-6 w-6 text-amber-400" /> 連携機能
              </CardTitle>
            </CardHeader>
            <CardContent className="grid items-start gap-6 md:grid-cols-2">
              <div>
                <p className="font-semibold text-amber-300">Bee連携</p>
                <ul className="ml-4 mt-2 list-disc space-y-1 text-slate-300">
                  <li>アクティブレポート自動取得（手動アップロード不要）</li>
                  <li>取り下げ候補支援：不要商品の自動提案</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-amber-300">Specifics In 連携（開発中）</p>
                <ul className="ml-4 mt-2 list-disc space-y-1 text-slate-300">
                  <li>CSV不要の直接連携</li>
          
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 料金・FAQ */}
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <Card className="overflow-hidden border-amber-400/30 bg-zinc-900/60 lg:col-span-2">
              <img
                src="/images/value-banner.png"
                alt="価値の向上を象徴するゴールドの光の軌跡"
                className="aspect-[21/9] w-full object-cover opacity-80"
                loading="lazy"
                decoding="async"
              />
              <CardHeader className="px-6 pb-2 pt-6 md:px-8 md:pt-8">
                <CardTitle className="flex items-center gap-2 text-amber-400 text-3xl md:text-4xl" style={serifStyle}>
                  <Crown className="h-7 w-7 md:h-8 md:w-8" /> 料金プラン（9/1発表予定）
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 px-6 pb-8 text-slate-200 text-base md:px-8 md:text-lg">
                <div>
                 
                </div>
                <div>
                  <p className="font-semibold text-amber-300">正式リリース（予定）</p>
                  <ul className="ml-5 mt-2 list-disc space-y-1">
                    <li>既存水準と同等の価格なのに価値向上</li>
                    <li>無料版も継続（既存無料相当の機能を維持予定）</li>
                    <li>プレミアム：対応サイト 最大16〜18サイト</li>
                    <li>アンカー：抽出上限 800件／依頼</li>
                  </ul>
                </div>
                <p className="text-xs text-slate-500">内容は予告なく変更される場合があります。</p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-zinc-900/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <HelpCircle className="h-6 w-6 text-amber-400" /> よくある質問
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-300">
                <Accordion type="single" collapsible className="space-y-3">
                  <AccordionItem value="f1" className="overflow-hidden rounded-lg border border-slate-800">
                    <AccordionTrigger className="px-4 py-3 text-left font-semibold hover:no-underline">
                      既存ツールからのデータ移行は必要？
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-slate-400">
                      別会社・別ツールのため直接移行は不可。危険セラー・危険単語はCSV形式が同じため手動移行は容易です。
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="f2" className="overflow-hidden rounded-lg border border-slate-800">
                    <AccordionTrigger className="px-4 py-3 text-left font-semibold hover:no-underline">
                      SKUや在庫の引き継ぎは？
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-slate-400">
                      SKUは暗号化固定で管理可能。既存SKUも認識し、在庫管理に収まっているものは管理可能です。
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="f3" className="overflow-hidden rounded-lg border border-slate-800">
                    <AccordionTrigger className="px-4 py-3 text-left font-semibold hover:no-underline">
                      無料版はありますか？
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-slate-400">
                      あり。既存ツールの無料版と同等機能を提供予定です（詳細は9/1発表）。
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="f4" className="overflow-hidden rounded-lg border border-slate-800">
                    <AccordionTrigger className="px-4 py-3 text-left font-semibold hover:no-underline">
                      従来ツールとの併用は可能？
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-slate-400">
                      物理的には可能ですが予期せぬ挙動のリスクあり。
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* 準備チェックリスト + 個別相談 CTA */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <Card className="border-amber-400/20 bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <ClipboardCheck className="h-6 w-6 text-amber-400" /> 参加前の準備チェックリスト
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-slate-300">
                <ul className="ml-4 list-disc space-y-1">
                  <li>DeepBayのアカウント作成とログイン</li>                  
                  <li>9/1〜9/7のライブ日程をカレンダーに追加</li>
                </ul>
                <p className="text-xs text-slate-500">不安点はライブまたは個別ミーティングで解消しましょう。</p>
              </CardContent>
            </Card>

            <Card className="border-amber-400/20 bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-100">
                  <Users className="h-6 w-6 text-amber-400" /> 30分 個別ミーティング
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <p>移行や運用設計の不安に、個別でお応えします（9月限定）。</p>
                <Dialog open={consultOpen} onOpenChange={setConsultOpen}>
                  <DialogTrigger asChild>
                   
                  </DialogTrigger>
                  <ConsultDialogContent isPending={isPending} formAction={formAction} state={state} />
                </Dialog>
                <p className="mt-3 text-xs text-slate-500">ご希望の日時を備考にご記入ください。</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Campaign */}
        {/* <section className="relative overflow-hidden rounded-2xl border border-amber-400/40 bg-zinc-900 p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 opacity-20">
            <Gem className="h-40 w-40 text-amber-400" />
          </div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold text-amber-400 md:text-5xl" style={serifStyle}>
              Limited Time Privilege
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-slate-300">
              9月1日〜30日限定：永久割引（3〜5%）＋ 初月15%OFF（検討中）
            </p>
            <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-dashed border-amber-400/50 p-6">
                <h3 className="text-xl text-slate-50">永久割引</h3>
                <p className="my-2 text-4xl font-bold text-amber-400">最大 5% OFF</p>
                <p className="text-slate-400">期間中に決済完了で月額が永続的に割引。</p>
              </div>
              <div className="rounded-lg border border-dashed border-amber-400/50 p-6">
                <h3 className="text-xl text-slate-50">初月特別割引</h3>
                <p className="my-2 text-4xl font-bold text-amber-400">15% OFF</p>
                <p className="text-slate-400">デミニマスルール対策として初月を優遇。</p>
              </div>
            </div>
            <div className="mt-10">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-amber-400 px-10 py-7 text-lg font-bold text-black hover:bg-amber-300">
                    特典付きで申し込む
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <SeminarDialogContent isPending={isPending} formAction={formAction} state={state} />
              </Dialog>
              <p className="mt-3 text-xs tracking-widest text-slate-500">完全移行サポート・30日間返金保証</p>
            </div>
          </div>
        </section> */}

        {/* Testimonials */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-slate-50 md:text-5xl" style={serifStyle}>
              Voices from Power Sellers
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-slate-400">
              従来ツールからの移行で、現場はどう変わったのか。実体験の声を公開。
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "A.S.（東京都）",
                quote: "編集速度が段違い。チーム同時編集もスムーズで、休眠在庫の消化が一気に進みました。",
              },
              {
                name: "K.M.（大阪府）",
                quote: "複数アカウントの制約が無くなり、事業の拡大ペースが加速。在庫の積み上げも効きます。",
              },
              {
                name: "Y.T.（福岡県）",
                quote: "標準機能化で、トータルコストが確実に下がりました。移行して正解でした。",
              },
            ].map((t) => (
              <Card key={t.name} className="overflow-hidden border-slate-800 bg-zinc-900/60">
                <img
                  src="/images/testimonial-texture.png"
                  alt="上質な背景テクスチャ"
                  className="h-20 w-full object-cover opacity-70"
                  loading="lazy"
                  decoding="async"
                />
                <CardContent className="p-6">
                  <p className="text-slate-200">“{t.quote}”</p>
                  <div className="mt-4 text-sm text-slate-500">{t.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-xl border border-amber-400/30 bg-gradient-to-br from-black to-zinc-900 p-10 text-center">
          <h2 className="text-4xl font-bold text-slate-50 md:text-5xl" style={serifStyle}>
            The Future Starts Now.
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-amber-300">
            9月1日、新時代の扉が開く。特典と共に、最前列でお待ちしています。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full bg-amber-400 px-10 py-7 text-lg font-bold text-black hover:bg-amber-300">
                  <Calendar className="mr-2 h-5 w-5" />
                  セミナーに参加する
                </Button>
              </DialogTrigger>
              <SeminarDialogContent isPending={isPending} formAction={formAction} state={state} />
            </Dialog>
            <a href="#pro-features">
              <Button
                variant="outline"
                className="rounded-full border-amber-400 px-10 py-7 text-lg font-semibold text-amber-400 hover:bg-amber-400 hover:text-black bg-transparent"
              >
                最新アップデートを見る
              </Button>
            </a>
          </div>
          <p className="mt-4 text-xs tracking-widest text-slate-500">アーカイブ配信数日間あり</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-slate-500">
          <p>&copy; 2025 DeepBay. The Next Generation Platform.</p>
          <p className="mt-1 text-sm">
            お問い合わせ:{" "}
            <a href="mailto:info@awiiin.com" className="text-amber-400 hover:text-amber-300">
            info@awiiin.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

function KeycapRow({ keyLabel, desc }: { keyLabel: string; desc: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="keycap">{keyLabel}</span>
      <span className="text-slate-300">{desc}</span>
    </div>
  )
}

function SeminarDialogContent({
  isPending,
  formAction,
  state,
}: {
  isPending: boolean
  formAction: (payload: FormData) => void
  state: SeminarRegistrationState | null
}) {
  return (
    <DialogContent className="border-amber-400/30 bg-zinc-950 text-slate-200 sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="text-2xl" style={serifStyle}>
          セミナーお申し込み
        </DialogTitle>
        <DialogDescription className="text-slate-400">
          必要事項をご記入ください。参加URLはメールでお送りします。
        </DialogDescription>
      </DialogHeader>
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="name">お名前</Label>
            <Input
              id="name"
              name="name"
              placeholder="山田 太郎"
              className="bg-black/40"
              aria-invalid={!!state?.errors?.name}
            />
            {state?.errors?.name && <p className="mt-1 text-xs text-red-400">{state.errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="taro@example.com"
              className="bg-black/40"
              aria-invalid={!!state?.errors?.email}
            />
            {state?.errors?.email && <p className="mt-1 text-xs text-red-400">{state.errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="company">会社名（任意）</Label>
            <Input id="company" name="company" placeholder="Deep Commerce Inc." className="bg-black/40" />
          </div>
          <div>
            <Label htmlFor="plan">ご利用予定プラン（任意）</Label>
            <Input id="plan" name="plan" placeholder="スタンダード / プレミアム など" className="bg-black/40" />
          </div>
          <div>
            <Label htmlFor="note">ご要望（任意）</Label>
            <Textarea id="note" name="note" placeholder="移行に関するご質問など" className="min-h-[90px] bg-black/40" />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full rounded-full bg-amber-400 py-6 text-base font-bold text-black hover:bg-amber-300 disabled:opacity-70"
        >
          {isPending ? "送信中…" : "この内容で申し込む"}
        </Button>
        <p className="mt-2 text-center text-xs text-slate-500">参加費無料・録画配信あり</p>
      </form>
    </DialogContent>
  )
}

function ConsultDialogContent({
  isPending,
  formAction,
  state,
}: {
  isPending: boolean
  formAction: (payload: FormData) => void
  state: SeminarRegistrationState | null
}) {
  return (
    <DialogContent className="border-amber-400/30 bg-zinc-950 text-slate-200 sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="text-2xl" style={serifStyle}>
          30分 個別ミーティング申込
        </DialogTitle>
        <DialogDescription className="text-slate-400">
          ご希望の日時やご相談内容を備考にご記入ください。担当より日程をご案内します。
        </DialogDescription>
      </DialogHeader>
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="kind" value="consult" />
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="c-name">お名前</Label>
            <Input
              id="c-name"
              name="name"
              placeholder="山田 太郎"
              className="bg-black/40"
              aria-invalid={!!state?.errors?.name}
            />
            {state?.errors?.name && <p className="mt-1 text-xs text-red-400">{state.errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="c-email">メールアドレス</Label>
            <Input
              id="c-email"
              name="email"
              type="email"
              placeholder="taro@example.com"
              className="bg-black/40"
              aria-invalid={!!state?.errors?.email}
            />
            {state?.errors?.email && <p className="mt-1 text-xs text-red-400">{state.errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="c-company">会社名（任意）</Label>
            <Input id="c-company" name="company" placeholder="Deep Commerce Inc." className="bg-black/40" />
          </div>
          <div>
            <Label htmlFor="c-note">備考（ご希望日時など）</Label>
            <Textarea
              id="c-note"
              name="note"
              placeholder="例）9/2（月）20時以降、在庫管理の移行について相談したい など"
              className="min-h-[100px] bg-black/40"
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full rounded-full bg-amber-400 py-6 text-base font-bold text-black hover:bg-amber-300 disabled:opacity-70"
        >
          {isPending ? "送信中…" : "この内容で申し込む"}
        </Button>
        <p className="mt-2 text-center text-xs text-slate-500">9月限定で実施しています。</p>
      </form>
    </DialogContent>
  )
}

function ValueCard({
  icon,
  title,
  caption,
  body,
}: {
  icon: React.ReactNode
  title: string
  caption: string
  body: string
}) {
  return (
    <Card className="border-slate-800 bg-transparent shadow-2xl shadow-black">
      <CardHeader>
        <div className="mb-3">{icon}</div>
        <CardTitle className="text-2xl text-slate-50" style={serifStyle}>
          {title}
        </CardTitle>
        <p className="text-sm text-slate-500">{caption}</p>
      </CardHeader>
      <CardContent className="text-slate-300">{body}</CardContent>
    </Card>
  )
}
