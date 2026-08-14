const featureCard = [
    {
        'id': 1,
        'short': "Today's arrival",
        'title': 'Stay ahead of every arrival',
        'subtitle': 'Get accurate vessel ETA, arrival schedules, and port activity in one place.',
    },
    {
        'id': 2,
        'short': "Today's departures ",
        'title': 'Manage departures with confidence',
        'subtitle': 'Monitor vessel departures, schedules, and operational updates without the manual work..'
    },
    {
        'id': 3,
        'short': "Management Data",
        'title': 'Everything your port needs, connected',
        'subtitle': 'Centralize vessel data, schedules, and management insights for faster, smarter decisions.'
    }
]
const featureCardOneState = [
    {
        'imo': 'KM012026',
        'from': {
            'short': 'SING',
            'full': 'Singapore'
        },
        'to': {
            'short': 'CTG',
            'full': 'Chittagong'
        },
        'from_date': 'SEP 12, 2026',
        'to_date': 'NOV 15, 2026',
        'position': 50,
    },
    {
        'imo': 'KM012027',
        'from': {
            'short': 'CTG',
            'full': 'Chittagong'
        },
        'to': {
            'short': 'JKT',
            'full': 'Jakarta'
        },
        'from_date': 'SEP 18, 2026',
        'to_date': 'NOV 22, 2026',
        'position': 35,
    },
    {
        'imo': 'KM012028',
        'from': {
            'short': 'DXB',
            'full': 'Dubai'
        },
        'to': {
            'short': 'SIN',
            'full': 'Singapore'
        },
        'from_date': 'SEP 25, 2026',
        'to_date': 'DEC 02, 2026',
        'position': 72,
    },
]


// navbar 
const navigationMenuItems = [
    {
        'label': 'About us',
        'link': '/about-us',
    },
    {
        'label': 'Services',
        'link': null,
    },
    {
        'label': 'Pricing',
        'link': null,
    },
    {
        'label': 'Contact',
        'link': '/contact-us',
    },
]

// about our core value
const aboutOurCoreValue = [
    {
        title: 'Reliability',
        'subtitle': 'We provide dependable vessel data and tracking insights that maritime teams can trust when making critical operational decisions.',
        'icon': 'shield'
    },
    {
        title: 'Innovation',
        'subtitle': 'We continuously improve our technology to make vessel tracking smarter, faster, and easier for modern maritime operations.',
        'icon': 'cpu'
    },
    {
        title: 'Transparency',
        'subtitle': 'We believe in clear, accessible, and accurate information—giving teams the visibility they need to operate with confidence.',
        'icon': 'eye'
    }
]

export { featureCard, featureCardOneState, navigationMenuItems, aboutOurCoreValue }