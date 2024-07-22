import { lusitana } from '@/app/ui/fonts';
import Logo from '@/public/Seal_W_large.png'
import Image from 'next/image'

export default function AcmeLogo() {
  return (
    <div className={`${lusitana.className} flex flex-row items-center leading-none text-white`}>
      <Image src={Logo} alt="OBC logo" width={80} height={80} className="object-contain"/>
    </div>
  );
}
