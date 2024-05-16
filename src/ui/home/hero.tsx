import Image from 'next/image'

export const Hero = () => {
  return (
    <section className="justify-center flex">
      <div className="flex flex-col-reverse sm:flex-row items-center gap-16">
        <div className="space-y-8 font-bold">
          <p className="text-4xl">Hello there o/</p>
          <p className="text-4xl">
            Here&apos;s what I&apos;m currently
            <br />
            working on
          </p>
        </div>
        <Image
          src="/rcmonteiro.jpeg"
          priority
          height={256}
          width={256}
          className="rounded-full border-4 border-highlight"
          alt="rcmonteiro avatar"
        />
      </div>
    </section>
  )
}
