repeat = (count, arr) ->
	ln = arr.length
	b = new Array()
	for i in [0..count]
		b.push(arr[i%ln])
	return b

window.data =
	past: [
		date: Date.parse('10.03.2012')
		title: 'Це CeBit, Мамо!' 
		count: 15
		topics: ['android', 'games']
		photos: 
			username: 'kyivgtugcenter'
			album: 'DevCafepastGDD'
		description: "
			<p>“BARCELOOONA! -3″ — традиционное ежегодное DevCafe+МастерКласс по Android GameDev
			<p>Программа:
			<p>1. “Android в Барселоне” — Сергей Митяев, редактор gagadget, участник Mobile World Congress 2012 (Barcelona, Spain)
			<p>2. MasterClass Game-development for Android:
			<p>2.1. “Как написать успешную игру (опыт создания и поддержки игры Dead Rider)” — Рафаэль Гилязитдинов (Ufa GTUG)
			<p>2.2. “Опыт участия GameDev-проектов в международных конкурсах а также разработка и продвижение игр в Android Market и альтернативних магазинах” — Михаил Дворников (Kyiv GTUG Center)
			<p>2.3. “GameDev как бизнес — новые вызовы и новые возможности” — Обсуждение
			"
	,
		date: Date.parse('03.03.2012')
		title: 'BARCELOOONA!-3 + Android GameDev Master-Class'
		count: 15
		topics: ['android']
	,
		date: { from: Date.parse('17.02.2012'), to: Date.parse('19.02.2012') } 
		title: 'Global Android Dev Camp'
		count: 15
		topics: ['android']
	,
		date: Date.parse('12.02.2012')
		title: 'Android Master-Class, Level 2'
		count: 15
		topics: ['android']
	,
		date: Date.parse('05.02.2012')
		title: 'Android Master-Class, Level 1'
		count: 15
		topics: ['android']
	,
		date: Date.parse('18.10.2011')
		title: 'Встреча с Андреем Ясинецким'
		count: 15
		topics: ['android', 'chrome']
	,
		date: Date.parse('14.10.2011')
		title: 'Встреча на Эльбе'
		count: 15
		topics: ['html5']
	,
	]
	future: [
		date: Date.parse('24.05.2012')
		title: 'Це CeBit, Мамо!' 
		topics: ['android', 'games']
		description: "
			<p>“BARCELOOONA! -3″ — традиционное ежегодное DevCafe+МастерКласс по Android GameDev
			<p>Программа:
			<p>— “Android в Барселоне” — Сергей<br> Митяев, редактор gagadget, участник Mobile World Congress 2012 (Barcelona, Spain)
			<p>—  MasterClass Game-development for Android:
			<p>1) “Как написать успешную игру (опыт создания и поддержки игры Dead Rider)” — Рафаэль Гилязитдинов (Ufa GTUG)
			<p>2) “Опыт участия GameDev-проектов в международных конкурсах а также разработка и продвижение игр в Android Market и альтернативних магазинах” — Михаил Дворников (Kyiv GTUG Center)
			<p>3) “GameDev как бизнес — новые вызовы и новые возможности” — Обсуждение
			"
	,
		date: 'Middle of June'
		title: 'BARCELOOONA!-3 + Android GameDev Master-Class'
	,
		date: 'Winter 2013'
		title: 'Встреча на Эльбе'
	,
	]
	members: repeat(50, [
		name: 'Vladimir Ivanov'
		visits: 43
		websites: 
			'Blog': 'http://gplus.to/vladivanov'
	,		
		name: 'Tymur Porkuian'
		visits: 15
		websites:
			'G+personal': 'http://gplus.to/fixpoint'
			'G+programming': 'http://gplus.to/leastfixedpoint'
			'GitHub': 'http://github.com/fixpoint'
	,
		name: 'Andrii Yasinetskyi'
		websites: 
			'Blog': 'http://codemastering.net'
	,
	])
