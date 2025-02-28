import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Recursos de tradução: para Português e English usamos textos diferentes; para os demais, usamos o recurso English como fallback,
// mas, se existir tradução específica, ela será utilizada.
const resources = {
    "Português": {
        translation: {
            sugestoes: "Sugestões:",
            placeholderInput: "Digite sua mensagem...",
            enviar: "Enviar",
            sentidoDaVida: "Qual o sentido da vida?",
            fraseInspiradora: "Gere uma frase inspiradora.",
            perguntasEntrevista: "Gere 5 perguntas para uma entrevista de emprego",
            erroLimite: "Limite de 1000 caracteres excedido.",
            erroPalavroes: "Por favor, evite o uso de palavrões.",
            apiFalhou: "A API falhou, por favor, escreva sua mensagem novamente",
            iaPensando: "IA pensando..."
        }
    },
    "English": {
        translation: {
            sugestoes: "Suggestions:",
            placeholderInput: "Type your message...",
            enviar: "Send",
            sentidoDaVida: "What is the meaning of life?",
            fraseInspiradora: "Generate an inspiring phrase.",
            perguntasEntrevista: "Generate 5 questions for a job interview",
            erroLimite: "Character limit exceeded (1000).",
            erroPalavroes: "Please avoid using profanity.",
            apiFalhou: "The API failed, please type your message again",
            iaPensando: "AI is thinking..."
        }
    },
    "Afrikaans": {
        translation: {
            sugestoes: "Voorstelle:",
            placeholderInput: "Tik jou boodskap...",
            enviar: "Stuur",
            sentidoDaVida: "Wat is die sin van die lewe?",
            fraseInspiradora: "Genereer 'n inspirerende frase.",
            perguntasEntrevista: "Genereer 5 vrae vir 'n werksinterview",
            erroLimite: "Karakterlimiet van 1000 oorskry.",
            erroPalavroes: "Vermy asseblief die gebruik van vloekwoorde.",
            apiFalhou: "Die API het misluk, tik asseblief jou boodskap weer",
            iaPensando: "KI dink..."
        }
    },
    "Shqip": { // Albanian
        translation: {
            sugestoes: "Sugjerime:",
            placeholderInput: "Shkruani mesazhin tuaj...",
            enviar: "Dërgo",
            sentidoDaVida: "Cili është kuptimi i jetës?",
            fraseInspiradora: "Gjenero një frazë frymëzuese.",
            perguntasEntrevista: "Gjenero 5 pyetje për një intervistë pune",
            erroLimite: "Kufiri i 1000 karaktereve është tejkaluar.",
            erroPalavroes: "Ju lutem shmangni përdorimin e fjalëve të papërshtatshme.",
            apiFalhou: "API-ja dështoi, ju lutem shkruani mesazhin tuaj përsëri",
            iaPensando: "Inteligjenca Artificiale po mendohet..."
        }
    },
    "አማርኛ": { // Amharic
        translation: {
            sugestoes: "ምክሮች:",
            placeholderInput: "መልእክትዎን ያስገቡ...",
            enviar: "ላክ",
            sentidoDaVida: "የሕይወት ትርጉም ምንድን ነው?",
            fraseInspiradora: "አንድ አስተማማኝ ሐሳብ ፍጠር።",
            perguntasEntrevista: "ለስራ ቃለ-መጠይቅ 5 ጥያቄዎች ፍጠር።",
            erroLimite: "1000 ቁምፊዎች ገደብ ተላልፏል።",
            erroPalavroes: "እባክዎ ከተገደቱ ቃላት ይቆጣጠሩ።",
            apiFalhou: "API አልተሳካም፣ እባክዎ መልእክትዎን እንደገና ያስገቡ",
            iaPensando: "ኤአይ እየሰራ ነው..."
        }
    },
    "العربية": { // Arabic
        translation: {
            sugestoes: "اقتراحات:",
            placeholderInput: "اكتب رسالتك...",
            enviar: "إرسال",
            sentidoDaVida: "ما هو معنى الحياة؟",
            fraseInspiradora: "قم بإنشاء عبارة ملهمة.",
            perguntasEntrevista: "قم بإنشاء 5 أسئلة لمقابلة عمل",
            erroLimite: "تم تجاوز حد 1000 حرف.",
            erroPalavroes: "يرجى تجنب استخدام الكلمات النابية.",
            apiFalhou: "فشلت واجهة البرمجة، يرجى كتابة رسالتك مرة أخرى",
            iaPensando: "الذكاء الاصطناعي يفكر..."
        }
    },
    "Հայերեն": { // Armenian
        translation: {
            sugestoes: "Առաջարկներ:",
            placeholderInput: "Մուտքագրեք ձեր հաղորդագրությունը...",
            enviar: "Ուղարկել",
            sentidoDaVida: "Ի՞նչ է կյանքի իմաստը:",
            fraseInspiradora: "Ստեղծեք ոգեշնչող արտահայտություն:",
            perguntasEntrevista: "Ստեղծեք 5 հարց հարցազրույցի համար",
            erroLimite: "Արկանիշների սահմանը գերազանցում է (1000):",
            erroPalavroes: "Խնդրում ենք խուսափել անարգե խոսքից:",
            apiFalhou: "API-ն ձախողվեց, խնդրում ենք կրկին մուտքագրել ձեր հաղորդագրությունը",
            iaPensando: "ԱԽ-ն մտածում է..."
        }
    },
    "Azərbaycan dili": { // Azerbaijani
        translation: {
            sugestoes: "Təkliflər:",
            placeholderInput: "Mesajınızı yazın...",
            enviar: "Göndər",
            sentidoDaVida: "Həyatın mənası nədir?",
            fraseInspiradora: "İlham verici bir ifadə yaradın.",
            perguntasEntrevista: "İş müsahibəsi üçün 5 sual yaradın",
            erroLimite: "1000 simvol həddi aşılmışdır.",
            erroPalavroes: "Lütfən, küfürlərdən istifadə etməyin.",
            apiFalhou: "API uğursuz oldu, zəhmət olmasa mesajınızı yenidən yazın",
            iaPensando: "Süni intellekt düşünür..."
        }
    },
    "Euskara": { // Basque
        translation: {
            sugestoes: "Iradokizunak:",
            placeholderInput: "Idatzi zure mezua...",
            enviar: "Bidali",
            sentidoDaVida: "Zer da bizitzaren esanahia?",
            fraseInspiradora: "Sortu esaldi inspiratzaile bat.",
            perguntasEntrevista: "Sortu 5 galdera lan elkarrizketarako",
            erroLimite: "1000 karaktere muga gainditua.",
            erroPalavroes: "Mesedez, saihestu irainak erabiltzea.",
            apiFalhou: "APIak huts egin du, mesedez idatzi zure mezua berriro",
            iaPensando: "Adimen artifiziala pentsatzen..."
        }
    },
    "Беларуская": { // Belarusian
        translation: {
            sugestoes: "Прапановы:",
            placeholderInput: "Набярыце сваё паведамленне...",
            enviar: "Адправіць",
            sentidoDaVida: "Які сэнс жыцця?",
            fraseInspiradora: "Стварыць натхняльную фразу.",
            perguntasEntrevista: "Стварыць 5 пытанняў для сумоўя на працу",
            erroLimite: "Пераўзыходжана мяжы 1000 сімвалаў.",
            erroPalavroes: "Калі ласка, пазбягайце непрыстойных слоў.",
            apiFalhou: "API не спрацавала, калі ласка, увядзіце паведамленне нанова",
            iaPensando: "ШІ думае..."
        }
    },
    "বাংলা": { // Bengali
        translation: {
            sugestoes: "প্রস্তাবনাসমূহ:",
            placeholderInput: "আপনার বার্তা লিখুন...",
            enviar: "পাঠান",
            sentidoDaVida: "জীবনের অর্থ কী?",
            fraseInspiradora: "একটি অনুপ্রেরণাদায়ক বাক্য তৈরি করুন।",
            perguntasEntrevista: "একটি চাকরির সাক্ষাৎকারের জন্য ৫টি প্রশ্ন তৈরি করুন।",
            erroLimite: "১০০০টি অক্ষরের সীমা অতিক্রান্ত হয়েছে।",
            erroPalavroes: "অনুগ্রহ করে অভদ্র ভাষা ব্যবহার থেকে বিরত থাকুন।",
            apiFalhou: "API ব্যর্থ হয়েছে, অনুগ্রহ করে আবার আপনার বার্তা লিখুন।",
            iaPensando: "কৃত্রিম বুদ্ধিমত্তা চিন্তা করছে..."
        }
    },
    "Bosanski": { // Bosnian
        translation: {
            sugestoes: "Prijedlozi:",
            placeholderInput: "Upišite svoju poruku...",
            enviar: "Pošalji",
            sentidoDaVida: "Koji je smisao života?",
            fraseInspiradora: "Generiši inspirativnu frazu.",
            perguntasEntrevista: "Generiši 5 pitanja za intervju za posao",
            erroLimite: "Prekoračen limit od 1000 znakova.",
            erroPalavroes: "Molimo izbjegavajte psovke.",
            apiFalhou: "API nije uspjela, molimo ponovo unesite vašu poruku",
            iaPensando: "AI razmišlja..."
        }
    },
    "Български": { // Bulgarian
        translation: {
            sugestoes: "Предложения:",
            placeholderInput: "Въведете вашето съобщение...",
            enviar: "Изпрати",
            sentidoDaVida: "Какъв е смисълът на живота?",
            fraseInspiradora: "Генерирайте вдъхновяваща фраза.",
            perguntasEntrevista: "Генерирайте 5 въпроса за интервю за работа",
            erroLimite: "Превишен лимит от 1000 знака.",
            erroPalavroes: "Моля, избягвайте нецензурни думи.",
            apiFalhou: "API-то не успя, моля въведете съобщението отново",
            iaPensando: "Изкуственият интелект мисли..."
        }
    },
    "Català": { // Catalan
        translation: {
            sugestoes: "Suggeriments:",
            placeholderInput: "Escriu el teu missatge...",
            enviar: "Envia",
            sentidoDaVida: "Quin és el sentit de la vida?",
            fraseInspiradora: "Genera una frase inspiradora.",
            perguntasEntrevista: "Genera 5 preguntes per a una entrevista de feina",
            erroLimite: "S'ha excedit el límit de 1000 caràcters.",
            erroPalavroes: "Si us plau, evita l'ús de paraules malsonants.",
            apiFalhou: "La API ha fallat, si us plau, torna a escriure el teu missatge",
            iaPensando: "La IA està pensant..."
        }
    },
    "Sinugbuanong": { // Cebuano (nativo pode ser "Binisaya" ou "Sinugbuanong Binisaya")
        translation: {
            sugestoes: "Mga sugyot:",
            placeholderInput: "Isulat ang imong mensahe...",
            enviar: "Ipadala",
            sentidoDaVida: "Unsa ang kahulugan sa kinabuhi?",
            fraseInspiradora: "Himoa ang usa ka makapadasig nga hugpong sa mga pulong.",
            perguntasEntrevista: "Himoa ang 5 ka pangutana para sa interbyu sa trabaho",
            erroLimite: "Nalapas ang limit sa 1000 ka karakter.",
            erroPalavroes: "Palihug likayi ang paggamit og bastos nga mga pulong.",
            apiFalhou: "Napakyas ang API, palihug isulat pag-usab ang imong mensahe",
            iaPensando: "Ang AI nagahunahuna..."
        }
    },
    "中文": { // Chinese
        translation: {
            sugestoes: "建议：",
            placeholderInput: "输入你的消息...",
            enviar: "发送",
            sentidoDaVida: "生命的意义是什么？",
            fraseInspiradora: "生成一句鼓舞人心的话。",
            perguntasEntrevista: "生成5个面试问题",
            erroLimite: "超过1000字符的限制。",
            erroPalavroes: "请避免使用粗俗语言。",
            apiFalhou: "API调用失败，请重新输入你的消息",
            iaPensando: "AI正在思考..."
        }
    },
    "Corsu": { // Corsican
        translation: {
            sugestoes: "Suggerimenti:",
            placeholderInput: "Scrivi u to messagiu...",
            enviar: "Mandà",
            sentidoDaVida: "Chì hè u sensu di a vita?",
            fraseInspiradora: "Genera una frasa ispiratrice.",
            perguntasEntrevista: "Genera 5 dumande per un'intervista di travagliu",
            erroLimite: "Limite di 1000 caratteri superatu.",
            erroPalavroes: "Per piacè, evita l'usu di paroli offensive.",
            apiFalhou: "L'API hà fallitu, per piacè scrivi dinò u to messagiu",
            iaPensando: "L'IA pensa..."
        }
    },
    "Hrvatski": { // Croatian
        translation: {
            sugestoes: "Prijedlozi:",
            placeholderInput: "Upišite svoju poruku...",
            enviar: "Pošalji",
            sentidoDaVida: "Koji je smisao života?",
            fraseInspiradora: "Generiraj inspirativnu frazu.",
            perguntasEntrevista: "Generiraj 5 pitanja za razgovor za posao",
            erroLimite: "Prekoračen limit od 1000 znakova.",
            erroPalavroes: "Molimo izbjegavajte psovke.",
            apiFalhou: "API nije uspjela, molimo unesite poruku ponovno",
            iaPensando: "AI razmišlja..."
        }
    },
    "Čeština": { // Czech
        translation: {
            sugestoes: "Návrhy:",
            placeholderInput: "Napište svou zprávu...",
            enviar: "Odeslat",
            sentidoDaVida: "Jaký je smysl života?",
            fraseInspiradora: "Vytvořte inspirativní frázi.",
            perguntasEntrevista: "Vytvořte 5 otázek na pracovní pohovor",
            erroLimite: "Byl překročen limit 1000 znaků.",
            erroPalavroes: "Prosím vyhněte se používání sprostých slov.",
            apiFalhou: "API selhalo, prosím napište svou zprávu znovu",
            iaPensando: "AI přemýšlí..."
        }
    },
    "Dansk": { // Danish
        translation: {
            sugestoes: "Forslag:",
            placeholderInput: "Skriv din besked...",
            enviar: "Send",
            sentidoDaVida: "Hvad er meningen med livet?",
            fraseInspiradora: "Generer en inspirerende sætning.",
            perguntasEntrevista: "Generer 5 spørgsmål til en jobsamtale",
            erroLimite: "Tegngrænsen på 1000 overskredet.",
            erroPalavroes: "Undgå venligst bandeord.",
            apiFalhou: "API'en mislykkedes, skriv venligst din besked igen",
            iaPensando: "AI tænker..."
        }
    },
    "Nederlands": { // Dutch
        translation: {
            sugestoes: "Suggesties:",
            placeholderInput: "Typ je bericht...",
            enviar: "Verstuur",
            sentidoDaVida: "Wat is de betekenis van het leven?",
            fraseInspiradora: "Genereer een inspirerende zin.",
            perguntasEntrevista: "Genereer 5 vragen voor een sollicitatiegesprek",
            erroLimite: "Tekenlimiet van 1000 overschreden.",
            erroPalavroes: "Vermijd alstublieft vloekwoorden.",
            apiFalhou: "De API is mislukt, typ uw bericht opnieuw",
            iaPensando: "AI is aan het denken..."
        }
    },
    "Esperanto": {
        translation: {
            sugestoes: "Sugestoj:",
            placeholderInput: "Tajpu vian mesaĝon...",
            enviar: "Sendu",
            sentidoDaVida: "Kio estas la signifo de vivo?",
            fraseInspiradora: "Generu inspiran frazon.",
            perguntasEntrevista: "Generu 5 demandojn por labora intervjuo",
            erroLimite: "Karakterlimito de 1000 superita.",
            erroPalavroes: "Bonvolu eviti uzadon de malĝentilaj vortoj.",
            apiFalhou: "La API malsukcesis, bonvolu re-tajpi vian mesaĝon",
            iaPensando: "AI pripensas..."
        }
    },
    "Eesti": { // Estonian
        translation: {
            sugestoes: "Soovitused:",
            placeholderInput: "Kirjutage oma sõnum...",
            enviar: "Saada",
            sentidoDaVida: "Mis on elu mõte?",
            fraseInspiradora: "Loo inspireeriv fraas.",
            perguntasEntrevista: "Loo 5 küsimust tööintervjuuks",
            erroLimite: "1000 tähemärgi piirang ületatud.",
            erroPalavroes: "Palun vältige roppuste kasutamist.",
            apiFalhou: "API ebaõnnestus, palun sisestage oma sõnum uuesti",
            iaPensando: "Tehisintellekt mõtleb..."
        }
    },
    "Suomi": { // Finnish
        translation: {
            sugestoes: "Ehdotukset:",
            placeholderInput: "Kirjoita viestisi...",
            enviar: "Lähetä",
            sentidoDaVida: "Mikä on elämän tarkoitus?",
            fraseInspiradora: "Luo inspiroiva lause.",
            perguntasEntrevista: "Luo 5 kysymystä työhaastattelua varten",
            erroLimite: "1000 merkin raja ylitetty.",
            erroPalavroes: "Vältäthän kirosanoja.",
            apiFalhou: "API epäonnistui, kirjoita viestisi uudelleen",
            iaPensando: "Tekoäly miettii..."
        }
    },
    "Français": { // French
        translation: {
            sugestoes: "Suggestions :",
            placeholderInput: "Tapez votre message...",
            enviar: "Envoyer",
            sentidoDaVida: "Quel est le sens de la vie ?",
            fraseInspiradora: "Générez une phrase inspirante.",
            perguntasEntrevista: "Générez 5 questions pour un entretien d'embauche",
            erroLimite: "Limite de 1000 caractères dépassée.",
            erroPalavroes: "Veuillez éviter d'utiliser des grossièretés.",
            apiFalhou: "L'API a échoué, veuillez ressaisir votre message",
            iaPensando: "L'IA réfléchit..."
        }
    },
    "Frysk": { // Frisian
        translation: {
            sugestoes: "Foarstellen:",
            placeholderInput: "Type dyn berjocht...",
            enviar: "Stjoer",
            sentidoDaVida: "Wat is de betsjutting fan it libben?",
            fraseInspiradora: "Generearje in ynspirearjende sin.",
            perguntasEntrevista: "Generearje 5 fragen foar in baanynterview",
            erroLimite: "Karakterlimiet fan 1000 oerskreaun.",
            erroPalavroes: "Meitsje asjebleaft gebrûk fan fluwery.",
            apiFalhou: "De API is mislearre, type asjebleaft dyn berjocht op 'e nij",
            iaPensando: "AI is tinking..."
        }
    },
    "Galego": { // Galician
        translation: {
            sugestoes: "Suxestións:",
            placeholderInput: "Escribe a túa mensaxe...",
            enviar: "Enviar",
            sentidoDaVida: "Cal é o sentido da vida?",
            fraseInspiradora: "Xera unha frase inspiradora.",
            perguntasEntrevista: "Xera 5 preguntas para unha entrevista de emprego",
            erroLimite: "Excedido o límite de 1000 caracteres.",
            erroPalavroes: "Por favor, evita o uso de palabrotas.",
            apiFalhou: "A API fallou, por favor escribe de novo a túa mensaxe",
            iaPensando: "A IA está a pensar..."
        }
    },
    "ქართული": { // Georgian
        translation: {
            sugestoes: "რჩევები:",
            placeholderInput: "შეიყვანეთ თქვენი შეტყობინება...",
            enviar: "გაგზავნა",
            sentidoDaVida: "რა არის ცხოვრების მნიშვნელობა?",
            fraseInspiradora: "შექმენით შთამონათლებელი ფრაზა.",
            perguntasEntrevista: "შექმენით 5 შეკითხვა სამუშაოზე",
            erroLimite: "გატევისუფლებულია 1000 სიმბოლო.",
            erroPalavroes: "გთხოვთ, არ გამოიყენოთ უხარისხო სიტყვები.",
            apiFalhou: "API-ს ვერ ასრულა, გთხოვთ კიდევ ერთხელ შეიყვანეთ შეტყობინება",
            iaPensando: "ხელოვნური ინტელექტი იფიქრებს..."
        }
    },
    "Deutsch": { // German
        translation: {
            sugestoes: "Vorschläge:",
            placeholderInput: "Gib deine Nachricht ein...",
            enviar: "Senden",
            sentidoDaVida: "Was ist der Sinn des Lebens?",
            fraseInspiradora: "Erzeuge einen inspirierenden Satz.",
            perguntasEntrevista: "Erzeuge 5 Fragen für ein Vorstellungsgespräch",
            erroLimite: "Zeichenlimit von 1000 überschritten.",
            erroPalavroes: "Bitte vermeide obszöne Sprache.",
            apiFalhou: "Die API ist fehlgeschlagen, bitte gib deine Nachricht erneut ein",
            iaPensando: "KI denkt nach..."
        }
    },
    "Ελληνικά": { // Greek
        translation: {
            sugestoes: "Προτάσεις:",
            placeholderInput: "Πληκτρολογήστε το μήνυμά σας...",
            enviar: "Αποστολή",
            sentidoDaVida: "Ποιο είναι το νόημα της ζωής;",
            fraseInspiradora: "Δημιουργήστε μια εμπνευσμένη φράση.",
            perguntasEntrevista: "Δημιουργήστε 5 ερωτήσεις για μια συνέντευξη εργασίας",
            erroLimite: "Έχετε υπερβεί το όριο των 1000 χαρακτήρων.",
            erroPalavroes: "Παρακαλώ αποφύγετε τη χρήση βωμολοχιών.",
            apiFalhou: "Το API απέτυχε, παρακαλώ πληκτρολογήστε ξανά το μήνυμά σας",
            iaPensando: "Η τεχνητή νοημοσύνη σκέφτεται..."
        }
    },
    "ગુજરાતી": { // Gujarati
        translation: {
            sugestoes: "સુચનો:",
            placeholderInput: "તમારો સંદેશ લખો...",
            enviar: "મોકલો",
            sentidoDaVida: "જીવનનો અર્થ શું છે?",
            fraseInspiradora: "પ્રેરણાદાયક વાક્ય બનાવો.",
            perguntasEntrevista: "નોકરીના ઈન્ટરવ્યુ માટે 5 પ્રશ્નો બનાવો.",
            erroLimite: "1000 અક્ષરની મર્યાદા પાર થઈ ગઈ છે.",
            erroPalavroes: "કૃપા કરીને અશુદ્ધ શબ્દોની વાપર ટાળો.",
            apiFalhou: "API નિષ્ફળ થયું, કૃપા કરીને તમારો સંદેશ ફરીથી લખો",
            iaPensando: "એઆઈ વિચારી રહ્યું છે..."
        }
    },
    "Kreyòl Ayisyen": { // Haitian Creole
        translation: {
            sugestoes: "Sijesyon:",
            placeholderInput: "Tape mesaj ou...",
            enviar: "Voye",
            sentidoDaVida: "Ki sans lavi a?",
            fraseInspiradora: "Jenere yon fraz ki enspire.",
            perguntasEntrevista: "Jenere 5 kesyon pou yon entèvyou travay",
            erroLimite: "Limit karaktè 1000 depase.",
            erroPalavroes: "Tanpri evite itilize move lang.",
            apiFalhou: "API a echwe, tanpri tape mesaj ou ankò",
            iaPensando: "Entelijans atifisyèl la ap panse..."
        }
    },
    "هَوُسَ": { // Hausa
        translation: {
            sugestoes: "Shawarwari:",
            placeholderInput: "Rubuta sakonka...",
            enviar: "Aika",
            sentidoDaVida: "Menene ma'anar rayuwa?",
            fraseInspiradora: "Ƙirƙiri wata jimla mai ƙarfafawa.",
            perguntasEntrevista: "Ƙirƙiri tambayoyi 5 don hira aiki",
            erroLimite: "An wuce iyakar haruffa 1000.",
            erroPalavroes: "Don Allah kada ka yi amfani da kalmomin ɓarna.",
            apiFalhou: "API ta kasa, don Allah sake rubuta sakonka",
            iaPensando: "AI na tunani..."
        }
    },
    "Íslenska": { // Icelandic
        translation: {
            sugestoes: "Tillögur:",
            placeholderInput: "Sláðu inn skilaboðin þín...",
            enviar: "Senda",
            sentidoDaVida: "Hver er tilgangur lífsins?",
            fraseInspiradora: "Búa til innblásandi setningu.",
            perguntasEntrevista: "Búa til 5 spurningar fyrir atvinnuviðtal.",
            erroLimite: "1000 stafafjöldi er yfir.",
            erroPalavroes: "Forðastu vinsamlegast svordomar.",
            apiFalhou: "API mistókst, vinsamlegast sláðu inn skilaboðin aftur.",
            iaPensando: "Gervigreindin er að hugsa..."
        }
    },
    "Bahasa Indonesia": { // Indonesian
        translation: {
            sugestoes: "Saran:",
            placeholderInput: "Ketik pesan Anda...",
            enviar: "Kirim",
            sentidoDaVida: "Apa arti hidup?",
            fraseInspiradora: "Hasilkan sebuah kalimat inspiratif.",
            perguntasEntrevista: "Buat 5 pertanyaan untuk wawancara kerja.",
            erroLimite: "Batas 1000 karakter terlampaui.",
            erroPalavroes: "Hindari penggunaan kata-kata kasar.",
            apiFalhou: "API gagal, silakan ketik ulang pesan Anda.",
            iaPensando: "AI sedang berpikir..."
        }
    },
    "Gaeilge": { // Irish
        translation: {
            sugestoes: "Moltaí:",
            placeholderInput: "Cuir isteach do theachtaireacht...",
            enviar: "Seol",
            sentidoDaVida: "Cad é brí an tsaoil?",
            fraseInspiradora: "Gineadh abairt inspioráideach.",
            perguntasEntrevista: "Gine 5 cheist le haghaidh agallamh oibre.",
            erroLimite: "Tá teorainn 1000 carachtar caite.",
            erroPalavroes: "Seachain focail míchuí le do thoil.",
            apiFalhou: "Theip ar an API, cuir do theachtaireacht arís isteach le do thoil.",
            iaPensando: "Tá AI ag smaoineamh..."
        }
    },
    "Italiano": { // Italian
        translation: {
            sugestoes: "Suggerimenti:",
            placeholderInput: "Digita il tuo messaggio...",
            enviar: "Invia",
            sentidoDaVida: "Qual è il senso della vita?",
            fraseInspiradora: "Genera una frase ispiratrice.",
            perguntasEntrevista: "Genera 5 domande per un colloquio di lavoro.",
            erroLimite: "Limite di 1000 caratteri superato.",
            erroPalavroes: "Per favore, evita le parolacce.",
            apiFalhou: "L'API non ha funzionato, ripeti il tuo messaggio.",
            iaPensando: "L'IA sta pensando..."
        }
    },
    "日本語": { // Japanese
        translation: {
            sugestoes: "提案:",
            placeholderInput: "メッセージを入力してください...",
            enviar: "送信",
            sentidoDaVida: "人生の意味は何ですか？",
            fraseInspiradora: "インスピレーションを与えるフレーズを生成する。",
            perguntasEntrevista: "就職面接のための質問を5つ生成する。",
            erroLimite: "1000文字の制限を超えました。",
            erroPalavroes: "不適切な言葉の使用は避けてください。",
            apiFalhou: "APIが失敗しました。再度メッセージを入力してください。",
            iaPensando: "AIが考えています..."
        }
    },
    "Basa Jawa": { // Javanese
        translation: {
            sugestoes: "Saran:",
            placeholderInput: "Ketik pesenmu...",
            enviar: "Kirim",
            sentidoDaVida: "Apa tegesing urip?",
            fraseInspiradora: "Gawe ukara inspiratif.",
            perguntasEntrevista: "Gawe 5 pitakonan kanggo wawancara kerja.",
            erroLimite: "Wates 1000 karakter wis kliwat.",
            erroPalavroes: "Mangga aja nggunakake tembung kasar.",
            apiFalhou: "API gagal, mangga ketik pesenmu maneh.",
            iaPensando: "AI lagi mikir..."
        }
    },
    "ಕನ್ನಡ": { // Kannada
        translation: {
            sugestoes: "ಸೂಚನೆಗಳು:",
            placeholderInput: "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ನಮೂದಿಸಿ...",
            enviar: "ಕಳುಹಿಸಿ",
            sentidoDaVida: "ಜೀವನದ ಅರ್ಥವೇನು?",
            fraseInspiradora: "ಪ್ರೇರಣಾದಾಯಕ ವಾಕ್ಯವನ್ನು ರಚಿಸಿ.",
            perguntasEntrevista: "ಉದ್ಯೋಗ ಸಂದರ್ಶನಕ್ಕಾಗಿ 5 ಪ್ರಶ್ನೆಗಳನ್ನು ರಚಿಸಿ.",
            erroLimite: "1000 ಅಕ್ಷರಗಳ ಮಿತಿ ಮೀರಿದೆ.",
            erroPalavroes: "ದಯವಿಟ್ಟು ಅಪಮಾನದ ಭಾಷೆಯನ್ನು ತ್ಯಜಿಸಿ.",
            apiFalhou: "API ವಿಫಲವಾಯಿತು, ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಪುನಃ ನಮೂದಿಸಿ.",
            iaPensando: "ಎಐ ಯೋಚಿಸುತ್ತಿದೆ..."
        }
    },
    "Қазақ тілі": { // Kazakh
        translation: {
            sugestoes: "Ұсыныстар:",
            placeholderInput: "Хабарламаңызды енгізіңіз...",
            enviar: "Жіберу",
            sentidoDaVida: "Өмірдің мәні не?",
            fraseInspiradora: "Шабыттандыратын сөйлем жасаңыз.",
            perguntasEntrevista: "Жұмыс сұхбаты үшін 5 сұрақ жасаңыз.",
            erroLimite: "1000 таңбадан асып кетті.",
            erroPalavroes: "Қате сөздерді пайдаланудан сақтаныңыз.",
            apiFalhou: "API сәтсіз аяқталды, хабарламаңызды қайта енгізіңіз.",
            iaPensando: "Жасанды интеллект ойланып жатыр..."
        }
    },
    "ខ្មែរ": { // Khmer
        translation: {
            sugestoes: "យោបល់:",
            placeholderInput: "វាយសាររបស់អ្នក...",
            enviar: "ផ្ញើ",
            sentidoDaVida: "ន័យនៃជីវិតគឺជាអ្វី?",
            fraseInspiradora: "បង្កើតប្រយោគបំផុសគំនិត។",
            perguntasEntrevista: "បង្កើតសំណួរ 5 សម្រាប់សម្ភាសការងារ។",
            erroLimite: "លើសកំណត់ 1000 តួអក្សរ។",
            erroPalavroes: "សូមជៀសវាងការប្រើពាក្យពុល។",
            apiFalhou: "API បានបរាជ័យ សូមវាយសារឡើងវិញ។",
            iaPensando: "AI កំពុងគិត..."
        }
    },
    "한국어": { // Korean
        translation: {
            sugestoes: "제안:",
            placeholderInput: "메시지를 입력하세요...",
            enviar: "보내기",
            sentidoDaVida: "삶의 의미는 무엇인가요?",
            fraseInspiradora: "영감을 주는 문장을 생성하세요.",
            perguntasEntrevista: "취업 면접을 위한 5개의 질문을 생성하세요.",
            erroLimite: "1000자 제한 초과.",
            erroPalavroes: "욕설 사용을 피해주세요.",
            apiFalhou: "API가 실패했습니다. 메시지를 다시 입력하세요.",
            iaPensando: "AI가 생각 중입니다..."
        }
    },
    "Kurdî": { // Kurdish
        translation: {
            sugestoes: "Pêşniyar:",
            placeholderInput: "Peyama xwe binivîse...",
            enviar: "Şandin",
            sentidoDaVida: "Ma'naya jiyan çi ye?",
            fraseInspiradora: "Gotinek ilhamdayîn çêke.",
            perguntasEntrevista: "5 pirs ji bo gotûbêja karê çêke.",
            erroLimite: "Sînorê 1000 tîpan hatî derbas kirin.",
            erroPalavroes: "Ji kerema xwe ji bikaranîna peyvên qehbel nake.",
            apiFalhou: "API têk çû, ji kerema xwe peyama xwe dubare binivîse.",
            iaPensando: "AI di bifikire..."
        }
    },
    "Кыргызча": { // Kyrgyz
        translation: {
            sugestoes: "Сунуштар:",
            placeholderInput: "Хабарламаңызды киргизиңиз...",
            enviar: "Жөнөтүү",
            sentidoDaVida: "Өмүрдүн мааниси эмне?",
            fraseInspiradora: "Илхам берет турган сүйлөмдү түзүңүз.",
            perguntasEntrevista: "Иш интервьюсу үчүн 5 суроону түзүңүз.",
            erroLimite: "1000 символдон ашык болду.",
            erroPalavroes: "Сураныч, уруксат берилбеген сөздөрдү колдонбоңуз.",
            apiFalhou: "API иштебеди, билдирмеңизди кайра киргизиңиз.",
            iaPensando: "Жасалма интеллект ойлоп жатат..."
        }
    },
    "ພາສາລາວ": { // Lao
        translation: {
            sugestoes: "ຄໍາແນະນໍາ:",
            placeholderInput: "ພິມຂໍ້ຄວາມຂອງທ່ານ...",
            enviar: "ສົ່ງ",
            sentidoDaVida: "ຄວາມໝາຍຂອງຊີວິດແມ່ນຫຍັງ?",
            fraseInspiradora: "ສ້າງປະໂຫຍດທີ່ແຮງແຮງ.",
            perguntasEntrevista: "ສ້າງຄໍາຖາມ 5 ຄໍາສໍາລັບການສຳພາດວຽກ.",
            erroLimite: "ເກີນຂອບເຂດ 1000 ຕົວອັກສອນ.",
            erroPalavroes: "ກະລຸນາຫຼີກເລີກຄໍາທີ່ບໍ່ຖືກຕ້ອງ.",
            apiFalhou: "API ລົ້ມເຫລວ, ກະລຸນາພິມຂໍ້ຄວາມຂອງທ່ານອີກຄັ້ງ.",
            iaPensando: "ປະຕິບັດ AI ກຳລັງຄິດ..."
        }
    },
    "Latina": { // Latin
        translation: {
            sugestoes: "Consilia:",
            placeholderInput: "Inseras nuntium tuum...",
            enviar: "Mitte",
            sentidoDaVida: "Quid est sensus vitae?",
            fraseInspiradora: "Genera sententiam inspiratricem.",
            perguntasEntrevista: "Genera 5 quaestiones ad colloquium laboris.",
            erroLimite: "Limes 1000 characterum superatus est.",
            erroPalavroes: "Quaeso, evita verba obscena.",
            apiFalhou: "API defecit, quaeso nuntium iterum inseras.",
            iaPensando: "AI cogitat..."
        }
    },
    "Latviešu": { // Latvian
        translation: {
            sugestoes: "Ieteikumi:",
            placeholderInput: "Ievadiet savu ziņu...",
            enviar: "Sūtīt",
            sentidoDaVida: "Kāds ir dzīves jēga?",
            fraseInspiradora: "Ģenerējiet iedvesmojošu frāzi.",
            perguntasEntrevista: "Ģenerējiet 5 jautājumus darba intervijai.",
            erroLimite: "Pārsniegts 1000 rakstzīmju limits.",
            erroPalavroes: "Lūdzu, izvairieties no necenzētām vārdiem.",
            apiFalhou: "API neizdevās, lūdzu, ievadiet ziņu vēlreiz.",
            iaPensando: "Mākslīgais intelekts domā..."
        }
    },
    "Lietuvių": { // Lithuanian
        translation: {
            sugestoes: "Pasiūlymai:",
            placeholderInput: "Įveskite savo žinutę...",
            enviar: "Siųsti",
            sentidoDaVida: "Koks gyvenimo prasmė?",
            fraseInspiradora: "Sugeneruokite įkvepiančią frazę.",
            perguntasEntrevista: "Sugeneruokite 5 klausimus darbo interviuui.",
            erroLimite: "Viršyta 1000 simbolių riba.",
            erroPalavroes: "Prašome vengti nepadorių žodžių.",
            apiFalhou: "API nepavyko, prašome įvesti žinutę dar kartą.",
            iaPensando: "DI mąsto..."
        }
    },
    "Lëtzebuergesch": { // Luxembourgish
        translation: {
            sugestoes: "Virschléi:",
            placeholderInput: "Gitt Är Noriicht an...",
            enviar: "Schécken",
            sentidoDaVida: "Wat ass de Sënn vum Liewen?",
            fraseInspiradora: "Generéiert eng inspiréierend Saz.",
            perguntasEntrevista: "Generéiert 5 Froen fir en Aarbechtsinterview.",
            erroLimite: "1000 Zeechen Limit iwwerschriwwen.",
            erroPalavroes: "Vermeit w.e.g. onpassend Wierder.",
            apiFalhou: "API ass net funktionnéiert, gitt Är Noriicht nei an.",
            iaPensando: "AI denkt..."
        }
    },
    "Македонски": { // Macedonian
        translation: {
            sugestoes: "Предлози:",
            placeholderInput: "Внесете ја вашата порака...",
            enviar: "Испратете",
            sentidoDaVida: "Кој е смислата на животот?",
            fraseInspiradora: "Генерирајте инспиративна фраза.",
            perguntasEntrevista: "Генерирајте 5 прашања за интервју за работа.",
            erroLimite: "Префатена граница од 1000 карактери.",
            erroPalavroes: "Ве молиме избегнувајте груби зборови.",
            apiFalhou: "API не успеа, ве молиме внесете ја пораката повторно.",
            iaPensando: "ИИ размислува..."
        }
    },
    "Malagasy": {
        translation: {
            sugestoes: "Soso-kevitra:",
            placeholderInput: "Ampidiro ny hafatrao...",
            enviar: "Alefaso",
            sentidoDaVida: "Inona no dikan'ny fiainana?",
            fraseInspiradora: "Mamokatra fehezanteny manentana.",
            perguntasEntrevista: "Mamokatra fanontaniana 5 ho an'ny resadresaka asa.",
            erroLimite: "Latsaka ambony ny fetra 1000 tarehintsoratra.",
            erroPalavroes: "Aza mampiasa teny maloto azafady.",
            apiFalhou: "Tsy nahomby ny API, azafady avereno ny hafatrao.",
            iaPensando: "AI mieritreritra..."
        }
    },
    "Bahasa Melayu": { // Malay
        translation: {
            sugestoes: "Cadangan:",
            placeholderInput: "Taip mesej anda...",
            enviar: "Hantar",
            sentidoDaVida: "Apakah makna hidup?",
            fraseInspiradora: "Jana satu ayat yang memberi inspirasi.",
            perguntasEntrevista: "Jana 5 soalan untuk temu duga pekerjaan.",
            erroLimite: "Had 1000 aksara telah melepasi.",
            erroPalavroes: "Sila elakkan penggunaan kata-kata kasar.",
            apiFalhou: "API gagal, sila taip mesej anda sekali lagi.",
            iaPensando: "AI sedang berfikir..."
        }
    },
    "മലയാളം": { // Malayalam
        translation: {
            sugestoes: "സുചേഷനുകൾ:",
            placeholderInput: "നിങ്ങളുടെ സന്ദേശം നൽകുക...",
            enviar: "അയക്കുക",
            sentidoDaVida: "ജീവിതത്തിന്റെ അർത്ഥം എന്താണ്?",
            fraseInspiradora: "പ്രചോദനമൊരുക്കുന്ന വാക്യം സൃഷ്ടിക്കുക.",
            perguntasEntrevista: "ഒരു ജോലിസ്ഥലം അഭിമുഖത്തിനായി 5 ചോദ്യങ്ങൾ സൃഷ്ടിക്കുക.",
            erroLimite: "1000 അക്ഷര പരിധി മറികടന്നിരിക്കുന്നു.",
            erroPalavroes: "ദയവായി അപകീർത്തികളെ ഒഴിവാക്കുക.",
            apiFalhou: "API പരാജയപ്പെട്ടു, ദയവായി വീണ്ടും നിങ്ങളുടെ സന്ദേശം നൽകുക.",
            iaPensando: "AI ചിന്തിക്കുന്നു..."
        }
    },
    "Malti": { // Maltese
        translation: {
            sugestoes: "Suggerimenti:",
            placeholderInput: "Daħħal il-messaġġ tiegħek...",
            enviar: "Ibgħat",
            sentidoDaVida: "X'inhu t-tifsira tal-ħajja?",
            fraseInspiradora: "Ġenera fraża ispiranti.",
            perguntasEntrevista: "Ġenera 5 mistoqsijiet għal intervista tax-xogħol.",
            erroLimite: "Limit ta' 1000 karattri miġi miżjud.",
            erroPalavroes: "Jekk jogħġbok evita l-użu ta' kliem offensiv.",
            apiFalhou: "L-API falliet, jekk jogħġbok daħħal mill-ġdid il-messaġġ tiegħek.",
            iaPensando: "L-AI qed taħseb..."
        }
    },
    "Māori": { // Maori
        translation: {
            sugestoes: "Ngā Tukurua:",
            placeholderInput: "Tuhia tō karere...",
            enviar: "Tukuna",
            sentidoDaVida: "He aha te tikanga o te ora?",
            fraseInspiradora: "Hangaia he rerenga korero whakaaweawe.",
            perguntasEntrevista: "Hangaia 5 pātai mō tētahi uiui mahi.",
            erroLimite: "Kua whiti te rārangi 1000 pūāhua.",
            erroPalavroes: "Kia karo te whakamahi kupu kino.",
            apiFalhou: "I rahua te API, koa tuhia anō tō karere.",
            iaPensando: "Kei te whakaaro te AI..."
        }
    },
    "मराठी": { // Marathi
        translation: {
            sugestoes: "सूचना:",
            placeholderInput: "तुमचा संदेश टाका...",
            enviar: "पाठवा",
            sentidoDaVida: "जीवनाचा अर्थ काय आहे?",
            fraseInspiradora: "प्रेरणादायक वाक्य तयार करा.",
            perguntasEntrevista: "नोकरीच्या मुलाखतीसाठी 5 प्रश्न तयार करा.",
            erroLimite: "1000 अक्षरांची मर्यादा ओलांडली.",
            erroPalavroes: "कृपया अश्लील शब्द वापरणे टाळा.",
            apiFalhou: "API अयशस्वी, कृपया तुमचा संदेश पुन्हा टाका.",
            iaPensando: "AI विचार करत आहे..."
        }
    },
    "Монгол": { // Mongolian
        translation: {
            sugestoes: "Санал:",
            placeholderInput: "Мессежээ оруулна уу...",
            enviar: "Илгээ",
            sentidoDaVida: "Амьдралын утга юу вэ?",
            fraseInspiradora: "Урам зориг өгдөг өгүүлбэр үүсгэ.",
            perguntasEntrevista: "Ажлын ярилцлагын 5 асуулт үүсгэ.",
            erroLimite: "1000 тэмдэгтээр хэтэрсэн.",
            erroPalavroes: "Харамсалтай үгсийг ашиглахаас зайлсхий.",
            apiFalhou: "API амжилтгүй боллоо, мессежээ дахин оруулна уу.",
            iaPensando: "Хиймэл оюун ухаан бодож байна..."
        }
    },
    "ဗမာစာ": { // Myanmar (Burmese)
        translation: {
            sugestoes: "အကြံပြုချက်များ:",
            placeholderInput: "သင့်စာကို ရိုက်ထည့်ပါ...",
            enviar: "ပို့မည်",
            sentidoDaVida: "ဘဝရဲ့ အဓိပ္ပါယ်က ဘာလဲ?",
            fraseInspiradora: "အလှူအတန်းဖြစ်စေမယ့် စာကြောင်း တစ်ကြောင်း ဖန်တီးပါ။",
            perguntasEntrevista: "အလုပ်အင်တာဗျူးအတွက် မေးခွန်း 5 ချက် ဖန်တီးပါ။",
            erroLimite: "1000 အက္ခရာက နဲ့ကျော်လွန်နေပါသည်။",
            erroPalavroes: "ကျေးဇူးပြု၍ အမြင်မကောင်းသော စကားလုံးများ မသုံးပါနှင့်။",
            apiFalhou: "API မအောင်မြင်ပါ, ကျေးဇူးပြု၍ သင့်စာကို ထပ်မံရိုက်ထည့်ပါ။",
            iaPensando: "AI စဉ်းစားနေပါသည်..."
        }
    },
    "नेपाली": { // Nepali
        translation: {
            sugestoes: "सुझावहरू:",
            placeholderInput: "तपाईंको सन्देश टाइप गर्नुहोस्...",
            enviar: "पठाउनुहोस्",
            sentidoDaVida: "जीवनको अर्थ के हो?",
            fraseInspiradora: "प्रेरणादायी वाक्य सिर्जना गर्नुहोस्।",
            perguntasEntrevista: "रोजगारी अन्तर्वार्ताको लागि 5 प्रश्न सिर्जना गर्नुहोस्।",
            erroLimite: "1000 क्यारेक्टरको सीमा पार भयो।",
            erroPalavroes: "कृपया अश्लील शब्दहरूको प्रयोग नगर्नुहोस्।",
            apiFalhou: "API असफल भयो, कृपया तपाईंको सन्देश पुन: टाइप गर्नुहोस्।",
            iaPensando: "AI सोच्दैछ..."
        }
    },
    "Norsk": { // Norwegian
        translation: {
            sugestoes: "Forslag:",
            placeholderInput: "Skriv inn meldingen din...",
            enviar: "Send",
            sentidoDaVida: "Hva er meningen med livet?",
            fraseInspiradora: "Generer en inspirerende setning.",
            perguntasEntrevista: "Generer 5 spørsmål for et jobbintervju.",
            erroLimite: "Tegnbegrensningen på 1000 er overskredet.",
            erroPalavroes: "Vennligst unngå banning.",
            apiFalhou: "API mislyktes, vennligst skriv inn meldingen din på nytt.",
            iaPensando: "AI tenker..."
        }
    },
    "ChiChewa": { // Nyanja
        translation: {
            sugestoes: "Mapangizo:",
            placeholderInput: "Lembani uthenga wanu...",
            enviar: "Tumizani",
            sentidoDaVida: "Tanthauzo la moyo ndi chiyani?",
            fraseInspiradora: "Pangani mawu othandiza.",
            perguntasEntrevista: "Pangani mafunso 5 a ntchito.",
            erroLimite: "Chikomo cha 1000 mawu chadzuka.",
            erroPalavroes: "Chonde musagwiritse ntchito mawu opanda mtendere.",
            apiFalhou: "API sathetsa, chonde lembani uthenga wanu kachiwiri.",
            iaPensando: "AI akuganiza..."
        }
    },
    "ଓଡ଼ିଆ": { // Odia
        translation: {
            sugestoes: "ସୁପାରିଶ:",
            placeholderInput: "ଆପଣଙ୍କର ସନ୍ଦେଶ ଲେଖନ୍ତୁ...",
            enviar: "ପଠାନ୍ତୁ",
            sentidoDaVida: "ଜୀବନର ଅର୍ଥ କଣ?",
            fraseInspiradora: "ଏକ ପ୍ରେରଣାଦାୟକ ବାକ୍ୟ ସୃଷ୍ଟି କରନ୍ତୁ.",
            perguntasEntrevista: "ଚାକିରି ସାକ୍ଷାତକାର ପାଇଁ 5ଟି ପ୍ରଶ୍ନ ସୃଷ୍ଟି କରନ୍ତୁ.",
            erroLimite: "1000 ଅକ୍ଷର ସୀମା ଅତିକ୍ରମ କରିଛି.",
            erroPalavroes: "ଦୟାକରି ଅଶୁଦ୍ଧ ଶବ୍ଦ ବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ.",
            apiFalhou: "API ବିଫଳ, ଦୟାକରି ଆପଣଙ୍କର ସନ୍ଦେଶ ପୁନର୍ଲେଖନ କରନ୍ତୁ.",
            iaPensando: "AI ଚିନ୍ତା କରୁଛି..."
        }
    },
    "پښتو": { // Pashto
        translation: {
            sugestoes: "سپارښتنې:",
            placeholderInput: "خپل پیغام ولیکئ...",
            enviar: "لیږل",
            sentidoDaVida: "د ژوند مانا څه ده؟",
            fraseInspiradora: "یو هڅوونکی جمله جوړ کړئ.",
            perguntasEntrevista: "د کار مرکې لپاره ۵ پوښتنې جوړې کړئ.",
            erroLimite: "د 1000 تورو حد څخه تېر شوی.",
            erroPalavroes: "مهرباني وکړئ بد کلمات مه کاروئ.",
            apiFalhou: "API ناکام شو، مهرباني وکړئ خپل پیغام بیا ولیکئ.",
            iaPensando: "AI په فکر کې دی..."
        }
    },
    "فارسی": { // Persian
        translation: {
            sugestoes: "پیشنهادات:",
            placeholderInput: "پیام خود را تایپ کنید...",
            enviar: "ارسال",
            sentidoDaVida: "معنای زندگی چیست؟",
            fraseInspiradora: "یک جمله الهام‌بخش ایجاد کنید.",
            perguntasEntrevista: "۵ سؤال برای مصاحبه شغلی ایجاد کنید.",
            erroLimite: "محدودیت ۱۰۰۰ کاراکتر فراتر رفته است.",
            erroPalavroes: "لطفاً از استفاده از الفاظ رکیک خودداری کنید.",
            apiFalhou: "API با خطا مواجه شد، لطفاً پیام خود را دوباره وارد کنید.",
            iaPensando: "هوش مصنوعی در حال تفکر است..."
        }
    },
    "Polski": { // Polish
        translation: {
            sugestoes: "Sugestie:",
            placeholderInput: "Wpisz swoją wiadomość...",
            enviar: "Wyślij",
            sentidoDaVida: "Jaki jest sens życia?",
            fraseInspiradora: "Wygeneruj inspirujące zdanie.",
            perguntasEntrevista: "Wygeneruj 5 pytań na rozmowę kwalifikacyjną.",
            erroLimite: "Przekroczono limit 1000 znaków.",
            erroPalavroes: "Proszę unikać używania wulgaryzmów.",
            apiFalhou: "API nie powiodło się, proszę wpisać wiadomość ponownie.",
            iaPensando: "AI myśli..."
        }
    },
    "ਪੰਜਾਬੀ": { // Punjabi
        translation: {
            sugestoes: "ਸੁਝਾਅ:",
            placeholderInput: "ਆਪਣਾ ਸੁਨੇਹਾ ਲਿਖੋ...",
            enviar: "ਭੇਜੋ",
            sentidoDaVida: "ਜੀਵਨ ਦਾ ਅਰਥ ਕੀ ਹੈ?",
            fraseInspiradora: "ਪ੍ਰੇਰਣਾਦਾਇਕ ਵਾਕ ਬਣਾਓ.",
            perguntasEntrevista: "ਨੌਕਰੀ ਇੰਟਰਵਿਊ ਲਈ 5 ਪ੍ਰਸ਼ਨ ਬਣਾਓ.",
            erroLimite: "1000 ਅੱਖਰਾਂ ਦੀ ਸੀਮਾ ਪਾਰ ਹੋ ਗਈ ਹੈ.",
            erroPalavroes: "ਕਿਰਪਾ ਕਰਕੇ ਅਸ਼ਲੀਲ ਸ਼ਬਦਾਂ ਤੋਂ ਬਚੋ.",
            apiFalhou: "API ਅਸਫਲ, ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਸੁਨੇਹਾ ਦੁਬਾਰਾ ਲਿਖੋ.",
            iaPensando: "AI ਸੋਚ ਰਿਹਾ ਹੈ..."
        }
    },
    "Română": { // Romanian
        translation: {
            sugestoes: "Sugestii:",
            placeholderInput: "Tastează mesajul tău...",
            enviar: "Trimite",
            sentidoDaVida: "Care este sensul vieții?",
            fraseInspiradora: "Generează o frază inspirațională.",
            perguntasEntrevista: "Generează 5 întrebări pentru un interviu de angajare.",
            erroLimite: "Limita de 1000 de caractere a fost depășită.",
            erroPalavroes: "Te rog evită utilizarea cuvintelor obscene.",
            apiFalhou: "API a eșuat, te rog tastează din nou mesajul.",
            iaPensando: "AI gândește..."
        }
    },
    "Русский": { // Russian
        translation: {
            sugestoes: "Предложения:",
            placeholderInput: "Введите ваше сообщение...",
            enviar: "Отправить",
            sentidoDaVida: "В чем смысл жизни?",
            fraseInspiradora: "Создайте вдохновляющую фразу.",
            perguntasEntrevista: "Создайте 5 вопросов для собеседования.",
            erroLimite: "Превышен лимит в 1000 символов.",
            erroPalavroes: "Пожалуйста, избегайте нецензурной лексики.",
            apiFalhou: "API не сработал, пожалуйста, введите сообщение снова.",
            iaPensando: "ИИ думает..."
        }
    },
    "Gagana Samoa": { // Samoan
        translation: {
            sugestoes: "Fautuaga:",
            placeholderInput: "Tusi lau feʻau...",
            enviar: "Auina",
            sentidoDaVida: "O le uiga o le olaga o le ā?",
            fraseInspiradora: "Fausia se upu fa'amalosi.",
            perguntasEntrevista: "Fausia 5 fesili mo se intervu faigaluega.",
            erroLimite: "Ua sili atu i le 1000 mataitusi.",
            erroPalavroes: "Fa'amolemole aloese le fa'aogaina o upu leaga.",
            apiFalhou: "Ua leaga le API, fa'amolemole tusi mai lau feʻau toe.",
            iaPensando: "O le AI o lo'o mafaufau..."
        }
    },
    "Gàidhlig": { // Scots Gaelic
        translation: {
            sugestoes: "Molaidhean:",
            placeholderInput: "Cuir a-steach do theachdaireachd...",
            enviar: "Cuir air falbh",
            sentidoDaVida: "Dè tha ciall na beatha?",
            fraseInspiradora: "Cruthaich abairt brosnachail.",
            perguntasEntrevista: "Cruthaich 5 ceistean airson agallamh obrach.",
            erroLimite: "Tha an crìoch de 1000 caractaran air a chur seachad.",
            erroPalavroes: "Feuch gun cleachd thu briathran mì-chofhurtail.",
            apiFalhou: "Thachair mearachd leis an API, cuir a-steach do theachdaireachd a-rithist.",
            iaPensando: "Tha AI a' smaoineachadh..."
        }
    },
    "Српски": { // Serbian
        translation: {
            sugestoes: "Predlozi:",
            placeholderInput: "Unesite svoju poruku...",
            enviar: "Pošalji",
            sentidoDaVida: "Koji je smisao života?",
            fraseInspiradora: "Generiši inspirativnu rečenicu.",
            perguntasEntrevista: "Generiši 5 pitanja za intervju za posao.",
            erroLimite: "Prekoračen limit od 1000 znakova.",
            erroPalavroes: "Molimo, izbegavajte psovke.",
            apiFalhou: "API nije uspeo, molimo unesite poruku ponovo.",
            iaPensando: "AI razmišlja..."
        }
    },
    "Sesotho": {
        translation: {
            sugestoes: "Likopo:",
            placeholderInput: "Ngola molaetsa oa hau...",
            enviar: "Romela",
            sentidoDaVida: "Ke eng moelelo oa bophelo?",
            fraseInspiradora: "Bōpa polelo e khothatsang.",
            perguntasEntrevista: "Bōpa lipotso tse 5 bakeng sa puisano ea mosebetsi.",
            erroLimite: "Moeli oa 1000 o fetohile.",
            erroPalavroes: "Ka kopo qoba ho sebelisa mantsoe a bohloko.",
            apiFalhou: "API ha e sebetsa, ka kopo ngola molaetsa oa hau hape.",
            iaPensando: "AI e nahana..."
        }
    },
    "chiShona": { // Shona
        translation: {
            sugestoes: "Mazano:",
            placeholderInput: "Nyora meseji yako...",
            enviar: "Tumira",
            sentidoDaVida: "Chii chinoreva hupenyu?",
            fraseInspiradora: "Gadzira chirevo chinokurudzira.",
            perguntasEntrevista: "Gadzira mibvunzo 5 yekubvunzurudza basa.",
            erroLimite: "Wadarika muganho we1000 mavara.",
            erroPalavroes: "Ndokumbira usashandise mazwi anokuvadza.",
            apiFalhou: "API yakundikana, ndapota nyora meseji yako zvakare.",
            iaPensando: "AI iri kufunga..."
        }
    },
    "سنڌي": { // Sindhi
        translation: {
            sugestoes: "تجاويز:",
            placeholderInput: "پنھنجو پيغام لکيو...",
            enviar: "موڪليو",
            sentidoDaVida: "زندگي جو مطلب ڇا آهي؟",
            fraseInspiradora: "هڪ متاثر ڪندڙ جملي ٺاھيو.",
            perguntasEntrevista: "نوڪري جي انٽرويو لاءِ 5 سوال ٺاھيو.",
            erroLimite: "1000 اکرن جي حد کان مٿي آهي.",
            erroPalavroes: "مھرباني ڪري ناشائستہ الفاظ جو استعمال نه ڪيو.",
            apiFalhou: "API ناڪام ٿي وئي، مھرباني ڪري پنھنجو پيغام ٻيهر لکيو.",
            iaPensando: "AI سوچ ۾ آهي..."
        }
    },
    "සිංහල": { // Sinhala
        translation: {
            sugestoes: "සූචනා:",
            placeholderInput: "ඔබගේ පණිවිඩය ටයිප් කරන්න...",
            enviar: "යවන්න",
            sentidoDaVida: "ජීවිතයේ අරුත කුමක්ද?",
            fraseInspiradora: "ප්‍රේරණය දෙන වාක්‍යයක් ජනනය කරන්න.",
            perguntasEntrevista: "රැකියා සම්මුඛ සාකච්ඡාව සඳහා ප්‍රශ්න 5ක් ජනනය කරන්න.",
            erroLimite: "අක්ෂර සීමාව 1000 ඉක්මවා ඇත.",
            erroPalavroes: "කරුණාකර අසභ්‍ය වචන භාවිතා කරන්න එපා.",
            apiFalhou: "API අසාර්ථකයි, කරුණාකර ඔබගේ පණිවිඩය නැවත ටයිප් කරන්න.",
            iaPensando: "AI සිතමින් ඇත..."
        }
    },
    "Návrhy": { // Slovak – note: Better to use "Slovenčina" but we'll use the native term "Slovenčina"
        translation: {
            sugestoes: "Návrhy:",
            placeholderInput: "Napíšte svoju správu...",
            enviar: "Odoslať",
            sentidoDaVida: "Aký je zmysel života?",
            fraseInspiradora: "Vygenerujte inšpiratívnu vetu.",
            perguntasEntrevista: "Vytvorte 5 otázky na pracovný pohovor.",
            erroLimite: "Prekročený limit 1000 znakov.",
            erroPalavroes: "Prosím, vyhnite sa sprostým slovám.",
            apiFalhou: "API zlyhalo, prosím napíšte svoju správu znovu.",
            iaPensando: "AI premýšľa..."
        }
    },
    "Slovenščina": { // Slovenian
        translation: {
            sugestoes: "Predlogi:",
            placeholderInput: "Vnesite svoje sporočilo...",
            enviar: "Pošlji",
            sentidoDaVida: "Kaj je smisel življenja?",
            fraseInspiradora: "Ustvarite navdihujoč stavek.",
            perguntasEntrevista: "Ustvarite 5 vprašanj za razgovor za zaposlitev.",
            erroLimite: "Prekoračen limit 1000 znakov.",
            erroPalavroes: "Prosimo, izogibajte se neprimernim besedam.",
            apiFalhou: "API ni uspel, prosimo, znova vnesite svoje sporočilo.",
            iaPensando: "AI razmišlja..."
        }
    },
    "Soomaaliga": { // Somali
        translation: {
            sugestoes: "Talooyin:",
            placeholderInput: "Geli fariintaada...",
            enviar: "Dir",
            sentidoDaVida: "Waa maxay macnaha nolosha?",
            fraseInspiradora: "Abuur oraah dhiirrigelin ah.",
            perguntasEntrevista: "Abuur 5 su'aalood oo wareysi shaqo ah.",
            erroLimite: "Xadka 1000 xaraf ayaa la dhaafay.",
            erroPalavroes: "Fadlan iska ilaali isticmaalka erayada xun.",
            apiFalhou: "API wuu fashilmay, fadlan mar kale geli fariintaada.",
            iaPensando: "AI ayaa ka fikiraya..."
        }
    },
    "Español": { // Spanish
        translation: {
            sugestoes: "Sugerencias:",
            placeholderInput: "Escribe tu mensaje...",
            enviar: "Enviar",
            sentidoDaVida: "¿Cuál es el sentido de la vida?",
            fraseInspiradora: "Genera una frase inspiradora.",
            perguntasEntrevista: "Genera 5 preguntas para una entrevista de trabajo.",
            erroLimite: "Límite de 1000 caracteres excedido.",
            erroPalavroes: "Por favor, evita el uso de palabrotas.",
            apiFalhou: "La API falló, por favor escribe tu mensaje nuevamente.",
            iaPensando: "La IA está pensando..."
        }
    },
    "Basa Sunda": { // Sundanese
        translation: {
            sugestoes: "Saran:",
            placeholderInput: "Ketik pesen anjeun...",
            enviar: "Kirim",
            sentidoDaVida: "Naon hartosna hirup?",
            fraseInspiradora: "Jieun kalimah anu ngahudangkeun sumanget.",
            perguntasEntrevista: "Jieun 5 patarosan pikeun wawancara padamelan.",
            erroLimite: "Wates 1000 karakter parantos kalangkung.",
            erroPalavroes: "Mangga hindarkeun ngagunakeun kecap kasar.",
            apiFalhou: "API gagal, mangga ketik deui pesen anjeun.",
            iaPensando: "AI keur mikir..."
        }
    },
    "Kiswahili": { // Swahili
        translation: {
            sugestoes: "Mapendekezo:",
            placeholderInput: "Andika ujumbe wako...",
            enviar: "Tuma",
            sentidoDaVida: "Maana ya maisha ni nini?",
            fraseInspiradora: "Tengeneza sentensi inayotoa msukumo.",
            perguntasEntrevista: "Tengeneza maswali 5 kwa ajili ya mahojiano ya kazi.",
            erroLimite: "Kiwango cha herufi 1000 kimezidiwa.",
            erroPalavroes: "Tafadhali epuka matumizi ya maneno mabaya.",
            apiFalhou: "API imeshindwa, tafadhali andika ujumbe wako tena.",
            iaPensando: "AI inafikiri..."
        }
    },
    "Svenska": { // Swedish
        translation: {
            sugestoes: "Förslag:",
            placeholderInput: "Skriv ditt meddelande...",
            enviar: "Skicka",
            sentidoDaVida: "Vad är meningen med livet?",
            fraseInspiradora: "Generera en inspirerande fras.",
            perguntasEntrevista: "Generera 5 frågor för en anställningsintervju.",
            erroLimite: "Teckenbegränsningen på 1000 överskriden.",
            erroPalavroes: "Var vänlig undvik att använda svordomar.",
            apiFalhou: "API misslyckades, vänligen skriv in ditt meddelande igen.",
            iaPensando: "AI tänker..."
        }
    },
    "Tagalog": { // Tagalog
        translation: {
            sugestoes: "Mga Suhestiyon:",
            placeholderInput: "I-type ang iyong mensahe...",
            enviar: "Ipadala",
            sentidoDaVida: "Ano ang kahulugan ng buhay?",
            fraseInspiradora: "Gumawa ng isang nakaka-inspire na pangungusap.",
            perguntasEntrevista: "Gumawa ng 5 tanong para sa isang job interview.",
            erroLimite: "Lumampas ang limitasyon ng 1000 karakter.",
            erroPalavroes: "Mangyaring iwasan ang malaswang salita.",
            apiFalhou: "Nabigo ang API, mangyaring i-type muli ang iyong mensahe.",
            iaPensando: "Ang AI ay nag-iisip..."
        }
    },
    "Тоҷикӣ": { // Tajik
        translation: {
            sugestoes: "Пешниҳодҳо:",
            placeholderInput: "Пайғоматонро нависед...",
            enviar: "Ирсол кунед",
            sentidoDaVida: "Маънои зиндагӣ чист?",
            fraseInspiradora: "Як ҷумлаи илҳомбахш эҷод кунед.",
            perguntasEntrevista: "Барои музокираи кор 5 савол эҷод кунед.",
            erroLimite: "Ҳадди 1000 ҳарф фаромӯш шудааст.",
            erroPalavroes: "Лутфан, аз истифодаи калимаҳои ғамгин пазируфта набароед.",
            apiFalhou: "API номуваффақ шуд, лутфан, паёматонро дубора нависед.",
            iaPensando: "AI фикр мекунад..."
        }
    },
    "தமிழ்": { // Tamil
        translation: {
            sugestoes: "பரிந்துரைகள்:",
            placeholderInput: "உங்கள் செய்தியை டைப் செய்யவும்...",
            enviar: "அனுப்பு",
            sentidoDaVida: "வாழ்க்கையின் பொருள் என்ன?",
            fraseInspiradora: "ஒரு ஊக்கம் அளிக்கும் வாக்கியம் உருவாக்கவும்.",
            perguntasEntrevista: "வேலை நேர்காணலுக்கு 5 கேள்விகளை உருவாக்கவும்.",
            erroLimite: "1000 எழுத்துக்கள் கடந்து விட்டது.",
            erroPalavroes: "தயவுசெய்து அசம்பந்தமான சொற்களை தவிர்க்கவும்.",
            apiFalhou: "API தோல்வியுற்றது, தயவுசெய்து உங்கள் செய்தியை மீண்டும் டைப் செய்யவும்.",
            iaPensando: "AI யோசித்து கொண்டிருக்கிறது..."
        }
    },
    "తెలుగు": { // Telugu
        translation: {
            sugestoes: "సూచనలు:",
            placeholderInput: "మీ సందేశాన్ని టైప్ చేయండి...",
            enviar: "కಳುహించు",
            sentidoDaVida: "జీవితార్థం ఏమిటి?",
            fraseInspiradora: "ఒక ప్రేరణాత్మక వాక్యం సృష్టించండి.",
            perguntasEntrevista: "ఉద్యోగ ఇంటర్వ్యూకోసం 5 ప్రశ్నలను సృష్టించండి.",
            erroLimite: "1000 అక్షరాల పరిమితిని దాటింది.",
            erroPalavroes: "దయచేసి అపవిత్ర పదాలను ఉపయోగించవద్దు.",
            apiFalhou: "API విఫలమైంది, దయచేసి మీ సందేశాన్ని తిరిగి టైప్ చేయండి.",
            iaPensando: "AI ఆలోచిస్తోంది..."
        }
    },
    "ไทย": { // Thai
        translation: {
            sugestoes: "ข้อเสนอแนะ:",
            placeholderInput: "พิมพ์ข้อความของคุณ...",
            enviar: "ส่ง",
            sentidoDaVida: "ความหมายของชีวิตคืออะไร?",
            fraseInspiradora: "สร้างประโยคที่สร้างแรงบันดาลใจ",
            perguntasEntrevista: "สร้างคำถาม 5 ข้อสำหรับการสัมภาษณ์งาน",
            erroLimite: "เกินขีดจำกัด 1000 ตัวอักษร",
            erroPalavroes: "โปรดหลีกเลี่ยงการใช้คำหยาบคาย",
            apiFalhou: "API ล้มเหลว โปรดพิมพ์ข้อความของคุณใหม่",
            iaPensando: "AI กำลังคิด..."
        }
    },
    "Türkçe": { // Turkish
        translation: {
            sugestoes: "Öneriler:",
            placeholderInput: "Mesajınızı yazın...",
            enviar: "Gönder",
            sentidoDaVida: "Hayatın anlamı nedir?",
            fraseInspiradora: "İlham verici bir cümle oluşturun.",
            perguntasEntrevista: "Bir iş görüşmesi için 5 soru oluşturun.",
            erroLimite: "1000 karakter sınırı aşıldı.",
            erroPalavroes: "Lütfen küfürden kaçının.",
            apiFalhou: "API başarısız oldu, lütfen mesajınızı tekrar yazın.",
            iaPensando: "Yapay zeka düşünüyor..."
        }
    },
    "Українська": { // Ukrainian
        translation: {
            sugestoes: "Пропозиції:",
            placeholderInput: "Введіть ваше повідомлення...",
            enviar: "Надіслати",
            sentidoDaVida: "Який сенс життя?",
            fraseInspiradora: "Згенеруйте надихаюче речення.",
            perguntasEntrevista: "Згенеруйте 5 питань для співбесіди.",
            erroLimite: "Перевищено ліміт у 1000 символів.",
            erroPalavroes: "Будь ласка, уникайте ненормативної лексики.",
            apiFalhou: "API не спрацював, будь ласка, введіть повідомлення ще раз.",
            iaPensando: "ШІ думає..."
        }
    },
    "اردو": { // Urdu
        translation: {
            sugestoes: "تجاویز:",
            placeholderInput: "اپنا پیغام لکھیں...",
            enviar: "بھیجیں",
            sentidoDaVida: "زندگی کا کیا مطلب ہے؟",
            fraseInspiradora: "ایک متاثر کن جملہ تیار کریں.",
            perguntasEntrevista: "روزگار کے انٹرویو کے لیے 5 سوال تیار کریں.",
            erroLimite: "1000 حروف کی حد سے تجاوز کر گیا ہے.",
            erroPalavroes: "براہ کرم ناشائستہ الفاظ سے پرہیز کریں.",
            apiFalhou: "API ناکام ہو گیا، براہ کرم اپنا پیغام دوبارہ لکھیں.",
            iaPensando: "AI سوچ رہا ہے..."
        }
    },
    "O‘zbek": { // Uzbek
        translation: {
            sugestoes: "Takliflar:",
            placeholderInput: "Xabaringizni kiriting...",
            enviar: "Yuborish",
            sentidoDaVida: "Hayot ma'nosi nima?",
            fraseInspiradora: "Ilhomlantiruvchi gap yarating.",
            perguntasEntrevista: "Ish suhbatiga 5 ta savol yarating.",
            erroLimite: "1000 belgidan oshdi.",
            erroPalavroes: "Iltimos, haqoratli so‘zlardan foydalanmang.",
            apiFalhou: "API muvaffaqiyatsiz, iltimos xabaringizni qaytadan kiriting.",
            iaPensando: "AI o'ylayapti..."
        }
    },
    "Tiếng Việt": { // Vietnamese
        translation: {
            sugestoes: "Gợi ý:",
            placeholderInput: "Nhập tin nhắn của bạn...",
            enviar: "Gửi",
            sentidoDaVida: "Ý nghĩa của cuộc sống là gì?",
            fraseInspiradora: "Tạo một câu truyền cảm hứng.",
            perguntasEntrevista: "Tạo 5 câu hỏi cho buổi phỏng vấn việc làm.",
            erroLimite: "Vượt quá giới hạn 1000 ký tự.",
            erroPalavroes: "Vui lòng tránh sử dụng từ ngữ thô tục.",
            apiFalhou: "API thất bại, vui lòng nhập lại tin nhắn của bạn.",
            iaPensando: "AI đang suy nghĩ..."
        }
    },
    "Cymraeg": { // Welsh
        translation: {
            sugestoes: "Awgrymiadau:",
            placeholderInput: "Teipiwch eich neges...",
            enviar: "Anfon",
            sentidoDaVida: "Beth yw ystyr bywyd?",
            fraseInspiradora: "Cynhyrchwch ymadrodd ysbrydoledig.",
            perguntasEntrevista: "Cynhyrchwch 5 cwestiwn ar gyfer cyfweliad swydd.",
            erroLimite: "Drosiodd y terfyn 1000 nod.",
            erroPalavroes: "Os gwelwch yn dda, osgoi defnyddio geiriau anaddas.",
            apiFalhou: "Methodoleg API wedi methu, teipiwch eich neges eto.",
            iaPensando: "Mae AI yn meddwl..."
        }
    },
    "isiXhosa": { // Xhosa
        translation: {
            sugestoes: "Iingcebiso:",
            placeholderInput: "Faka umyalezo wakho...",
            enviar: "Thumela",
            sentidoDaVida: "Intsingiselo yobomi yintoni?",
            fraseInspiradora: "Yenza isivakalisi esikhuthazayo.",
            perguntasEntrevista: "Yenza imibuzo emihlanu yomsebenzi.",
            erroLimite: "Umkhawulo we-1000 weebala udlulile.",
            erroPalavroes: "Nceda ugweme ukusebenzisa amagama acinezelayo.",
            apiFalhou: "I-API ayiphumelelanga, nceda faka umyalezo wakho kwakhona.",
            iaPensando: "I-AI iyacinga..."
        }
    },
    "ייִדיש": { // Yiddish
        translation: {
            sugestoes: "פֿאָרשלאגן:",
            placeholderInput: "טיפּן דיין אָנזאָג...",
            enviar: "שיקן",
            sentidoDaVida: "וואָס איז דער זין פון לעבן?",
            fraseInspiradora: "שאַפֿן אַ אינספּיראַציעדיקן זאַץ.",
            perguntasEntrevista: "שאַפֿן 5 פֿראגן פֿאַר אַ ארבעט־פֿאַרשפּרעכונג.",
            erroLimite: "דער גרענעץ פון 1000 כאַראַקטערס איז איבערגאַנגען.",
            erroPalavroes: "ביטע פאַרמיידן אומגלויבלעכע ווערטער.",
            apiFalhou: "API האָט ניט געאַרבעט, ביטע טיפּן דיין אָנזאָג ווידער.",
            iaPensando: "AI טראכט..."
        }
    },
    "Yorùbá": { // Yoruba
        translation: {
            sugestoes: "Àwọn ìmòràn:",
            placeholderInput: "Tẹ ifiranṣẹ rẹ...",
            enviar: "Firanṣẹ",
            sentidoDaVida: "Kí ni ìtumọ̀ ayé?",
            fraseInspiradora: "Ṣẹda gbolohun tí ń fi ìmísí hàn.",
            perguntasEntrevista: "Ṣẹda ìbéèrè 5 fún ìfọ̀rọ̀wánilẹ́nuwò iṣẹ́.",
            erroLimite: "Ìwọn 1000 àwọn àmì kọjá lọ.",
            erroPalavroes: "Jọwọ má lo àwọn ọ̀rọ̀ burúkú.",
            apiFalhou: "API kò ṣiṣẹ́, jọwọ tún tẹ ifiranṣẹ rẹ.",
            iaPensando: "AI ń rò..."
        }
    },
    "isiZulu": { // Zulu
        translation: {
            sugestoes: "Iziphakamiso:",
            placeholderInput: "Faka umyalezo wakho...",
            enviar: "Thumela",
            sentidoDaVida: "Usho ukuthini ukuphila?",
            fraseInspiradora: "Dala isigwebo esishukumisa.",
            perguntasEntrevista: "Dala imibuzo emi-5 yokuxoxisana ngomsebenzi.",
            erroLimite: "Umkhawulo wezinhlamvu eziyi-1000 udlulelwe.",
            erroPalavroes: "Ngiyacela, gwema ukusebenzisa amagama angafanele.",
            apiFalhou: "I-API ayisebenzi, sicela uphinde ufake umyalezo wakho.",
            iaPensando: "I-AI iyacabanga..."
        }
    }
};

// Lista de nomes dos idiomas nos seus idiomas nativos
export const languageNames: string[] = [
    "Afrikaans",
    "Shqip",             // Albanian
    "አማርኛ",            // Amharic
    "العربية",         // Arabic
    "Հայերեն",          // Armenian
    "Azərbaycan dili",   // Azerbaijani
    "Euskara",           // Basque
    "Беларуская",        // Belarusian
    "বাংলা",            // Bengali
    "Bosanski",          // Bosnian
    "Български",         // Bulgarian
    "Català",            // Catalan
    "Sinugbuanong",      // Cebuano (ou pode ser "Binisaya")
    "中文",              // Chinese
    "Corsu",             // Corsican
    "Hrvatski",          // Croatian
    "Čeština",           // Czech
    "Dansk",             // Danish
    "Nederlands",        // Dutch
    "English",           // English
    "Esperanto",         // Esperanto
    "Eesti",             // Estonian
    "Suomi",             // Finnish
    "Français",          // French
    "Frysk",             // Frisian
    "Galego",            // Galician
    "ქართული",          // Georgian
    "Deutsch",           // German
    "Ελληνικά",          // Greek
    "ગુજરાતી",           // Gujarati
    "Kreyòl Ayisyen",    // Haitian Creole
    "هَوُسَ",           // Hausa
    "Íslenska",          // Icelandic
    "Bahasa Indonesia",  // Indonesian
    "Gaeilge",           // Irish
    "Italiano",          // Italian
    "日本語",             // Japanese
    "Basa Jawa",         // Javanese
    "ಕನ್ನಡ",            // Kannada
    "Қазақ тілі",       // Kazakh
    "ខ្មែរ",              // Khmer
    "한국어",             // Korean
    "Kurdî",             // Kurdish
    "Кыргызча",         // Kyrgyz
    "ພາສາລາວ",         // Lao
    "Latina",            // Latin
    "Latviešu",          // Latvian
    "Lietuvių",          // Lithuanian
    "Lëtzebuergesch",     // Luxembourgish
    "Македонски",        // Macedonian
    "Malagasy",          // Malagasy
    "Bahasa Melayu",     // Malay
    "മലയാളം",           // Malayalam
    "Malti",             // Maltese
    "Māori",             // Maori
    "मराठी",            // Marathi
    "Монгол",            // Mongolian
    "ဗမာစာ",           // Myanmar (Burmese)
    "नेपाली",            // Nepali
    "Norsk",             // Norwegian
    "ChiChewa",          // Nyanja
    "ଓଡ଼ିଆ",            // Odia
    "پښتو",             // Pashto
    "فارسی",            // Persian
    "Polski",            // Polish
    "ਪੰਜਾਬੀ",           // Punjabi
    "Română",            // Romanian
    "Русский",           // Russian
    "Gagana Samoa",      // Samoan
    "Gàidhlig",          // Scots Gaelic
    "Српски",            // Serbian
    "Sesotho",           // Sesotho
    "chiShona",          // Shona
    "سنڌي",             // Sindhi
    "සිංහල",            // Sinhala
    "Slovenčina",        // Slovak
    "Slovenščina",       // Slovenian
    "Soomaaliga",        // Somali
    "Español",           // Spanish
    "Basa Sunda",        // Sundanese
    "Kiswahili",         // Swahili
    "Svenska",           // Swedish
    "Tagalog",           // Tagalog
    "Тоҷикӣ",           // Tajik
    "தமிழ்",            // Tamil
    "తెలుగు",           // Telugu
    "ไทย",               // Thai
    "Türkçe",            // Turkish
    "Українська",        // Ukrainian
    "اردو",             // Urdu
    "O‘zbek",            // Uzbek
    "Tiếng Việt",        // Vietnamese
    "Cymraeg",           // Welsh
    "isiXhosa",          // Xhosa
    "ייִדיש",           // Yiddish
    "Yorùbá",            // Yoruba
    "isiZulu",           // Zulu
    "Português"          // Portuguese
];

i18n.use(initReactI18next).init({
    resources,
    lng: "Português",
    fallbackLng: "Português",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
