// import Link from 'next/link'
import Navigation from '@/components/Navigation';

export default function Home() {


  return (
    <Navigation navLinks={[{name: "Home", href: "/"}, {name: "Play", href: "/play"}]}/>
    // <Link href="/play">Play</Link>

  )


}
