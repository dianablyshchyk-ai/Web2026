export default defineEventHandler(() => {
  return [
    {
      id: 1,
      slug: 'starter',
      buttonText: 'Try It Free',
      features: [
        { main: 'Primary user only', sub: '(extra team members for $35/month)' },
        { main: 'Save unlimited properties', sub: '' },
        { main: '10,000 exports', sub: '(additional exports at $0.02 each)' },
        { main: '500 free skip traces', sub: '(additional skip tracing at $0.08 each)' },
        { main: 'Imports $0.01', sub: '' },
        { main: 'FREE daily product trainings and support', sub: '' },
        { main: 'Full suite of next-gen investing tools', sub: '' },
        { main: 'Industry first AI powered comp tool', sub: '' },
        { main: 'Includes dedicated support agent', sub: '' }
      ],
      annual: {
        title: 'Starter - Annual',
        price: '83.25',
        fullPrice: '1,188',
        oldPrice: '999.00',
        savings: '189'
      },
      monthly: {
        title: 'Starter - Monthly',
        price: '99.00',
        fullPrice: '',
        oldPrice: '',
        savings: '0'
      }
    },
    {
      id: 2,
      slug: 'team',
      buttonText: 'Try It Free',
      features: [
        { main: 'Primary user + 2 free team members', sub: '(extra team members for $25/month)' },
        { main: 'Save unlimited properties', sub: '' },
        { main: '50,000 exports', sub: '(additional exports at $0.01 each)' },
        { main: '1,000 free skip traces', sub: '(additional skip tracing at $0.08 each)' },
        { main: 'Imports $0.01', sub: '' },
        { main: 'FREE daily product trainings and support', sub: '' },
        { main: 'Full suite of next-gen investing tools', sub: '' },
        { main: 'Industry first AI powered comp tool', sub: '' },
        { main: 'Includes dedicated support agent', sub: '' }
      ],
      annual: {
        title: 'Team - Annual',
        price: '207.50',
        fullPrice: '2,988',
        oldPrice: '2,490.00',
        savings: '498'
      },
      monthly: {
        title: 'Team - Monthly',
        price: '249.00',
        fullPrice: '',
        oldPrice: '',
        savings: '0'
      }
    },
    {
      id: 3,
      slug: 'business',
      buttonText: 'Try It Free',
      features: [
        { main: 'Primary user + 6 free team members', sub: '(extra team members for $20/month)' },
        { main: 'Save unlimited properties', sub: '' },
        { main: '100,000 exports', sub: '(additional exports at $0.01 each)' },
        { main: '2,000 free skip traces', sub: '(additional skip tracing at $0.08 each)' },
        { main: 'Imports $0.01', sub: '' },
        { main: 'FREE daily product trainings and support', sub: '' },
        { main: 'Full suite of next-gen investing tools', sub: '' },
        { main: 'Industry first AI powered comp tool', sub: '' },
        { main: 'Includes dedicated support agent', sub: '' }
      ],
      annual: {
        title: 'Business - Annual',
        price: '457.50',
        fullPrice: '6,588',
        oldPrice: '5,490.00',
        savings: '1,098'
      },
      monthly: {
        title: 'Business - Monthly',
        price: '549.00',
        fullPrice: '',
        oldPrice: '',
        savings: '0'
      }
    }
  ]
})
