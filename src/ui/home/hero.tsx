import Image from 'next/image'

export const Hero = () => {
  return (
    <section className="justify-center flex">
      <div className="flex flex-col-reverse sm:flex-row items-center gap-6">
        <div className="space-y-8 text-4xl font-bold">
          <p>Hello there o/</p>
          <p>
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
