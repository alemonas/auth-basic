import {Card, Heading, Text, Button} from 'theme-ui'
import Layout from '../components/Layout'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

function Dashboard() {
  const history = useHistory()
  const [userInfo] = useState(() => {
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      return JSON.parse(storedUserInfo)
    }
    return null
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('expiresAt')

    history.push('/login')
  }

  return (
    <Layout>
      <Heading>Dashboard</Heading>
      {userInfo && (
        <Card>
          <Text>Welcome {userInfo.firstName}</Text>{' '}
          <Button onClick={handleLogout}>Logout</Button>
        </Card>
      )}
    </Layout>
  )
}

export default Dashboard
