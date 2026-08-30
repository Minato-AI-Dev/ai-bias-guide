/* AI偏見図鑑 — データ定義 */

const AI_DB = {
  chatgpt: {
    name: "ChatGPT",
    aliases: ["chatgpt", "chat gpt", "gpt", "gpt4", "gpt-4", "gpt5", "gpt-5", "openai"],
    bias: "“ちょっと聞きたいだけ”で始まり、気づけば人生設計まで相談している。",
    fatal: "それ、友達に聞けばよくない？",
    phrase: "一応ChatGPTにも聞いてみる。",
    enemy: "即決できる人。",
    match: "Claudeにも同じ質問を投げる人。",
    extra: "会話履歴だけ見ると、もう同居している。"
  },
  claude: {
    name: "Claude",
    aliases: ["claude", "claude code", "anthropic"],
    bias: "文章に“知性の照明”を当てたがる。",
    fatal: "ちょっと文章長くない？",
    phrase: "もう少しニュアンスを残したい。",
    enemy: "要点だけでいい人。",
    match: "Notionの見出し階層が美しい人。",
    extra: "メール1通に“思想”を入れようとする。"
  },
  gemini: {
    name: "Gemini",
    aliases: ["gemini", "google gemini", "bard"],
    bias: "Google検索を卒業した顔をして、実家はまだGoogle。",
    fatal: "それ普通に検索すれば出るよ。",
    phrase: "Google連携が強いから。",
    enemy: "検索窓に直接打つ人。",
    match: "Google Driveのフォルダが47階層ある人。",
    extra: "Googleから一歩も出てないのに、旅立った顔をしている。"
  },
  perplexity: {
    name: "Perplexity",
    aliases: ["perplexity", "perplexity ai", "ppx"],
    bias: "“ソースある？”が口癖。なお自分の発言にはない。",
    fatal: "で、あなた自身はどう思うの？",
    phrase: "一応一次情報見よう。",
    enemy: "雰囲気で話す人。",
    match: "Wikipediaを開いたあと参考文献まで降りる人。",
    extra: "居酒屋でも出典を要求してくる。"
  },
  grok: {
    name: "Grok",
    aliases: ["grok", "grok ai", "xai", "x ai"],
    bias: "普通の答えが出ると、AIにまで裏切られた気持ちになる。",
    fatal: "普通に答えて。",
    phrase: "もうちょい攻めて。",
    enemy: "コンプラ担当。",
    match: "プロフィール欄に“皮肉”って書いてある人。",
    extra: "AIにも飲み会の二次会テンションを求めている。"
  },
  midjourney: {
    name: "Midjourney",
    aliases: ["midjourney", "mj"],
    bias: "説明できないので、煙と逆光でなんとかする。",
    fatal: "で、何を伝えたい画像なの？",
    phrase: "もっとシネマティックに。",
    enemy: "昼の蛍光灯。",
    match: "Pinterestを資料と言い張る人。",
    extra: "困ったら霧、粒子、ゴールデンアワー。"
  },
  canva: {
    name: "Canva AI",
    aliases: ["canva ai", "canva"],
    bias: "デザインはできない。でも“余白”という単語は覚えた。",
    fatal: "テンプレそのままだね。",
    phrase: "ここ、もうちょい抜け感ほしい。",
    enemy: "PowerPoint職人。",
    match: "フォントを変えただけでリブランディングと言う人。",
    extra: "余白を増やした瞬間だけデザイナーの顔になる。"
  },
  notion: {
    name: "Notion AI",
    aliases: ["notion ai", "notion"],
    bias: "人生をデータベース化すれば、月曜日も怖くないと思っている。",
    fatal: "それ、メモ帳でよくない？",
    phrase: "一回整理しよう。",
    enemy: "付箋1枚で仕事が終わる人。",
    match: "タグを付けるためのタグを作る人。",
    extra: "タスク管理に2時間、タスクに20分。"
  },
  copilot: {
    name: "GitHub Copilot",
    aliases: ["github copilot", "copilot", "ghcopilot"],
    bias: "自分で書ける。でも書きたくない。この違いにはうるさい。",
    fatal: "それAIが書いたんでしょ？",
    phrase: "いや、レビューはしてるから。",
    enemy: "全部手打ちする先輩。",
    match: "ショートカットキーで会話する人。",
    extra: "Tabキーへの信頼が人間より厚い。"
  },
  cursor: {
    name: "Cursor",
    aliases: ["cursor", "cursor ai", "cursor editor"],
    bias: "30分の作業を5分にするため、土日を全部使う。",
    fatal: "これ手でやった方が早くない？",
    phrase: "いや、一回仕組み化したら速いから。",
    enemy: "Excelが普通に使える人。",
    match: "自動化のためなら手動作業を100回できる人。",
    extra: "効率化の初期費用に人生を払っている。"
  },
  character: {
    name: "Character.AI",
    aliases: ["character.ai", "character ai", "c.ai", "characterai"],
    bias: "現実の人間には既読スルーされる可能性があるので、文明を降りた。",
    fatal: "その人、実在するの？",
    phrase: "設定が深いんだよ。",
    enemy: "突然電話してくる友達。",
    match: "推しと会話できるなら睡眠を削れる人。",
    extra: "現実の人間関係に“再生成”ボタンを探している。"
  },
  suno: {
    name: "Suno",
    aliases: ["suno", "suno ai"],
    bias: "コードは押さえられないが、サビでは天下を取っている。",
    fatal: "ライブではどうするの？",
    phrase: "ここで一回転調したい。",
    enemy: "楽器屋。",
    match: "作曲経験ゼロでアルバム構想だけある人。",
    extra: "まだ1曲目なのにワールドツアーの日程を考えている。"
  },
  runway: {
    name: "Runway",
    aliases: ["runway", "runwayml", "runway ml"],
    bias: "映画監督ではない。だがカメラがゆっくり前進すると急に黙る。",
    fatal: "何の映像？",
    phrase: "もう少し映画っぽく。",
    enemy: "固定カメラ。",
    match: "3秒の映像に制作秘話がある人。",
    extra: "ストーリーより先にレンズフレアが決まっている。"
  },
  elevenlabs: {
    name: "ElevenLabs",
    aliases: ["elevenlabs", "eleven labs", "11labs"],
    bias: "自分の声は嫌い。でも自分の文章を他人の声で聞くのは大好き。",
    fatal: "自分で読めば？",
    phrase: "もう少し自然な抑揚で。",
    enemy: "地声に自信がある人。",
    match: "マイクを買う前に声を生成する人。",
    extra: "声帯をアップデートできないことに薄くキレている。"
  },
  gamma: {
    name: "Gamma",
    aliases: ["gamma", "gamma app", "gamma.app"],
    bias: "資料を作りたいんじゃない。“もう完成してる感”が欲しい。",
    fatal: "中身、何が言いたいの？",
    phrase: "一旦スライドにしてみよう。",
    enemy: "白紙からPowerPointを作れる人。",
    match: "タイトルページを見ただけで仕事した気になる人。",
    extra: "結論はまだないが、表紙はもう上場企業。"
  },
  notebooklm: {
    name: "NotebookLM",
    aliases: ["notebooklm", "notebook lm"],
    bias: "人の話は聞かないが、PDFの話は最後まで聞く。",
    fatal: "資料読んだ？",
    phrase: "一回全部入れよう。",
    enemy: "口頭だけで説明する上司。",
    match: "会議より議事録を信じる人。",
    extra: "PDFを入れた瞬間だけ急に勤勉になる。"
  },
  deepseek: {
    name: "DeepSeek",
    aliases: ["deepseek", "deep seek"],
    bias: "性能比較表を見ると人格が少し変わる。",
    fatal: "でも普段そんなベンチマーク使わないよね？",
    phrase: "この価格でこれは強い。",
    enemy: "体感で選ぶ人。",
    match: "モデル名に数字が増えると元気になる人。",
    extra: "AIを使っている時間より比較表を見ている時間の方が長い。"
  },
  manus: {
    name: "Manus",
    aliases: ["manus", "manus ai"],
    bias: "自分でやる気はある。自分でやる予定はない。",
    fatal: "自分でやった方が早くない？",
    phrase: "そこはエージェントに任せる。",
    enemy: "自分で電話できる人。",
    match: "“丸投げ”を“オーケストレーション”と言う人。",
    extra: "秘書を雇うほどではないが、王様ではありたい。"
  },
  replit: {
    name: "Replit",
    aliases: ["replit", "repl.it", "replit ai"],
    bias: "環境構築という言葉を見ると、急に遠くを見る。",
    fatal: "ローカルで動かせば？",
    phrase: "ブラウザで完結するから。",
    enemy: "黒いターミナルを怖がらない人。",
    match: "READMEのInstallationで帰宅したことがある人。",
    extra: "セットアップを避けるためならサービスを3つ契約する。"
  },
  lovable: {
    name: "Lovable",
    aliases: ["lovable", "lovable.dev"],
    bias: "コードは書けないが、“SaaSを立ち上げた人の顔”だけはできる。",
    fatal: "ユーザー何人いるの？",
    phrase: "MVPはもうある。",
    enemy: "売上を聞いてくる人。",
    match: "ドメイン取得を創業と呼ぶ人。",
    extra: "ログイン画面ができた時点でCEOの目をしている。"
  },
  bolt: {
    name: "Bolt",
    aliases: ["bolt", "bolt.new", "boltnew"],
    bias: "3分で作ったものを、3か月運用できると思っている。",
    fatal: "保守どうするの？",
    phrase: "とりあえず出そう。",
    enemy: "本番障害。",
    match: "β版という言葉を免罪符に使う人。",
    extra: "技術負債を未来の自分へのサプライズだと思っている。"
  },
  v0: {
    name: "v0",
    aliases: ["v0", "v0.dev", "vercel v0"],
    bias: "UIは完成している。事業はまだない。",
    fatal: "誰が使うの？",
    phrase: "見た目はもうほぼ完成。",
    enemy: "顧客インタビュー。",
    match: "LPだけ先に作る人。",
    extra: "角丸カードが8枚並んだ瞬間、資金調達できそうな気がしている。"
  },
  napkin: {
    name: "Napkin AI",
    aliases: ["napkin", "napkin ai", "napkin.ai"],
    bias: "図にすると理解した気になるタイプ。",
    fatal: "これ、文章で一行じゃない？",
    phrase: "図解した方が伝わる。",
    enemy: "箇条書き3行。",
    match: "矢印を引いた瞬間に因果関係が生まれたと思う人。",
    extra: "四角と矢印に世界を支配させようとしている。"
  },
  otter: {
    name: "Otter",
    aliases: ["otter", "otter.ai", "otterai"],
    bias: "会議中に一番仕事しているのがAI。",
    fatal: "で、あなた何話した？",
    phrase: "あとで議事録見ます。",
    enemy: "メモを取る人。",
    match: "会議を録音した瞬間、記憶を手放す人。",
    extra: "参加者6人、当事者1匹。"
  },
  fireflies: {
    name: "Fireflies",
    aliases: ["fireflies", "fireflies.ai"],
    bias: "人間同士の会議に、人間より真面目な虫を参加させている。",
    fatal: "このbot誰が呼んだの？",
    phrase: "自動で入る設定です。",
    enemy: "少人数の雑談ミーティング。",
    match: "雑談まで検索可能にしたい人。",
    extra: "社内で一番出席率が高いのが昆虫。"
  },
  heygen: {
    name: "HeyGen",
    aliases: ["heygen", "hey gen"],
    bias: "自分が喋るのは嫌。でも自分そっくりの何かには喋らせたい。",
    fatal: "本人が出ればよくない？",
    phrase: "スケールしないから。",
    enemy: "カメラ慣れしている人。",
    match: "自分を量産することに抵抗がない人。",
    extra: "本人よりアバターの方が働いている。"
  },
  synthesia: {
    name: "Synthesia",
    aliases: ["synthesia"],
    bias: "プレゼンに人間味は欲しいが、人間は別にいらない。",
    fatal: "ちょっと怖くない？",
    phrase: "研修動画なら十分。",
    enemy: "生身の講師。",
    match: "社員教育を完全に無人化したい人。",
    extra: "会社説明会から人類を退場させようとしている。"
  },
  poe: {
    name: "Poe",
    aliases: ["poe", "poe.com", "quora poe"],
    bias: "一人のAIを信じるのが怖くて、AIにもセカンドオピニオンを求める。",
    fatal: "結局どれ使ってるの？",
    phrase: "モデルによって得意不得意あるから。",
    enemy: "一個に決められる人。",
    match: "昼飯すら比較表で決める人。",
    extra: "AIを選ぶためにAIを使う段階に入っている。"
  },
  phind: {
    name: "Phind",
    aliases: ["phind"],
    bias: "エンジニア向け検索を使う自分に、少し酔っている。",
    fatal: "Googleじゃダメ？",
    phrase: "開発用途ならこっちの方がいい。",
    enemy: "Stack Overflowで即解決する人。",
    match: "検索エンジンにも専門性を要求する人。",
    extra: "検索窓を変えただけなのに職業意識が3割増す。"
  },
  windsurf: {
    name: "Windsurf",
    aliases: ["windsurf", "windsurf editor", "codeium windsurf"],
    bias: "Cursorとの違いを説明し始めると急に早口になる。",
    fatal: "ほぼ同じじゃない？",
    phrase: "いや思想が違う。",
    enemy: "VS Codeだけで満足している人。",
    match: "エディタ選びに宗派がある人。",
    extra: "コードを書く前にIDE論争で午前中が終わる。"
  }
};

const CATEGORY_DB = [
  {
    key: "search", name: "検索系",
    keywords: ["検索", "search", "find", "serp", "kagi"],
    bias: "検索しているというより、“自分で調べた感”を外注している。",
    fatal: "普通に検索したら？",
    phrase: "",
    enemy: "検索演算子を知っている人。",
    match: "", extra: ""
  },
  {
    key: "image", name: "画像生成系",
    keywords: ["画像", "image", "photo", "picture", "art", "絵", "diffusion", "flux", "leonardo", "ideogram", "draw"],
    bias: "頭の中の“なんかいい感じ”を、機械に謝りながら翻訳させている。",
    fatal: "自分で描けば？",
    phrase: "惜しい。もうちょい右。",
    enemy: "", match: "", extra: ""
  },
  {
    key: "video", name: "動画生成系",
    keywords: ["動画", "video", "movie", "film", "pika", "luma", "kling", "sora", "veo"],
    bias: "映画を作りたい人ではなく、映画祭のインタビューだけ先に想像している人。",
    fatal: "", phrase: "ここ、ワンカットで。",
    enemy: "ストーリーボード。",
    match: "", extra: ""
  },
  {
    key: "coding", name: "コーディング系",
    keywords: ["code", "コード", "dev", "開発", "プログラ", "ide", "codeium", "tabnine", "aider", "claude code"],
    bias: "コードを書く時間を減らした結果、AIに指示する文章が一番長くなった。",
    fatal: "自分で直せば？",
    phrase: "そこじゃない。",
    enemy: "", match: "", extra: ""
  },
  {
    key: "automation", name: "自動化系",
    keywords: ["自動", "automat", "workflow", "zapier", "make.com", "n8n", "エージェント", "agent"],
    bias: "一度でも同じ作業を2回すると、“敗北”と感じる。",
    fatal: "", phrase: "これ自動化できるな。",
    enemy: "月1回しかない作業。",
    match: "", extra: ""
  },
  {
    key: "minutes", name: "議事録系",
    keywords: ["議事録", "meeting", "transcribe", "transcript", "記録", "minutes"],
    bias: "会議を覚える気はない。でも“ちゃんと参加してました感”は残したい。",
    fatal: "", phrase: "録れてるから大丈夫。",
    enemy: "録音禁止。",
    match: "", extra: ""
  },
  {
    key: "slides", name: "プレゼン系",
    keywords: ["スライド", "slide", "presentation", "プレゼン", "deck", "pitch"],
    bias: "内容より先に、角丸カードが並ぶ。",
    fatal: "結論は？",
    phrase: "",
    enemy: "Word一枚で通す上司。",
    match: "", extra: ""
  },
  {
    key: "voice", name: "音声系",
    keywords: ["音声", "voice", "speech", "tts", "podcast", "ボイス"],
    bias: "自分で話すより、声帯をAPIにしたい。",
    fatal: "", phrase: "声質だけ変えよう。",
    enemy: "一発録り。",
    match: "", extra: ""
  },
  {
    key: "character", name: "キャラクター系",
    keywords: ["キャラ", "character", "companion", "恋愛", "彼女", "彼氏", "replika"],
    bias: "人間関係にも“再生成”ボタンが欲しい。",
    fatal: "現実には戻れないよ。",
    phrase: "",
    enemy: "既読。",
    match: "", extra: ""
  }
];

const UNKNOWN_QUOTES = [
  "それを使っている時点で、あなたの問題は性格ではなく情報感度です。",
  "そのAIを知ってる人、たぶん開発者とあなたしかいません。",
  "“ChatGPTじゃダメなの？”と言われるたび、少しだけ嬉しい。",
  "まだ誰も使ってないAIを使うことで、未来から来た感じを出している。",
  "便利だから使っているのではない。“知られてないから”使っている。",
  "Product Huntの奥地から持ってきました？",
  "そのサービス、利用者数より創業者の人数の方が多くないですか？",
  "名前を聞いた瞬間、こちら側にも調査義務が発生しました。",
  "あなたがユーザー第4号の可能性があります。",
  "それAIというより、昨日できたURLでは？"
];

const COMBOS = [
  {
    names: ["chatgpt", "claude"],
    text: "文章をChatGPTで作って、Claudeに“もう少し自然に”と言わせていますね？",
    button: "違います",
    reply: "ではClaudeで作ってChatGPTに短くさせていますね？"
  },
  {
    names: ["cursor", "windsurf"],
    text: "宗教戦争を始めないでください。"
  },
  {
    names: ["midjourney", "canva"],
    text: "生成した画像をCanvaに持っていき、文字を置いた瞬間に“作品”と呼んでいます。"
  },
  {
    names: ["notion", "notebooklm"],
    text: "情報を整理するための情報が増えています。"
  },
  {
    names: ["suno", "runway"],
    text: "まだ作品は完成していませんが、MVだけはあります。"
  },
  {
    names: ["lovable", "bolt", "v0"],
    title: "起業家セットを検出しました。",
    text: "売上はまだです。"
  }
];

const DUPLICATE_MESSAGES = [
  "好きなのは分かりました。",
  "",
  "圧が強いです。",
  "そのAIと何かありました？",
  "もう結婚してください。"
];

const MANY_MESSAGES = ["多いな。", "一旦聞きます。", "仕事、何してるんですか？"];

const OVERLOAD_LABELS = [
  { label: "契約サービス数", value: "危険" },
  { label: "役割の重複", value: "多数" },
  { label: "用途不明", value: "3件" },
  { label: "最後に使った日を覚えていないAI", value: "4件" }
];

const OBJECTION_STEPS = [
  { text: "異議を申し立てるほど効いています。" },
  { text: "その反論、Claudeに添削させました？" },
  { text: "AIに反論までさせるんですか？" },
  { text: "分かりました。あなたが正しいです。", followUp: "これで満足ですか？", followUpDelay: 800 },
  { evasive: true },
  { text: "怖い怖い怖い。" },
  { relabel: "カウンセリングを予約" },
  { text: "ここAI偏見診断ですよ。" },
  { shrink: "異" },
  { text: "執念だけは本物ですね。", remove: true }
];

const GLOBAL_MESSAGES = [
  { threshold: 100, takeover: true },
  { threshold: 50, text: "あなたの診断結果をこちらが知りたいです。" },
  { threshold: 30, text: "そろそろAIを閉じて、水を飲んでください。" },
  { threshold: 20, text: "そんなに自分の偏見を探さなくても、もう十分あります。" }
];
