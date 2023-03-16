import './global.css'
import styled from 'styled-components'
import Head from './components/Head'
import Grid from './components/Grid'
import Filters from './components/Filters'
import HeroSlider from './components/HeroSlider'

function App() {
  return (
    <>
      <Head
        title="Social Feed"
        description="Latest Instagram & Twitter Posts for the upcoming event"
      />
      <Wrapper className="App">
        <HeroSlider />
        <Filters />
        <Grid />
      </Wrapper>
    </>
  )
}

export default App

const Wrapper = styled.div`
  margin-bottom: 15rem;
`
