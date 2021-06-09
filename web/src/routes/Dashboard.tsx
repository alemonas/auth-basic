import {Card, Heading, Text, Button} from 'theme-ui'
import Layout from '../components/Layout'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAppDisptach} from '../redux/hooks'
import {clearState} from '../redux/authSlice'

function Dashboard() {
  const history = useHistory()
  const dispatch = useAppDisptach()
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

    dispatch(clearState())

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
