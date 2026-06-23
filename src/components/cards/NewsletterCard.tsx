const newsletter = {
  tag: 'PATIENT SUPPORT',
  title: 'STAY UPDATED BEFORE APPOINTMENTS OPEN',
  description:
    'Have questions about appointments, CDCP coverage, or denture services? Reach out and we’ll help guide you through the next step.',
  placeholder: 'Email address',
  buttonText: 'Submit'
};
export default function NewsletterCard() {
  return (
    <div className="rounded-xl bg-secondary p-6">
      <p className="mb-1 text-[10px] uppercase text-white-blue">{`{${newsletter.tag}}`} </p>
      <h3 className="text-xl font-bold uppercase leading-tight text-white-blue">{newsletter.title}</h3>
      <p className="mt-6 text-base leading-snug text-white-blue">{newsletter.description}</p>
      <form className="mt-10 max-w-150 xl:max-w-70 mx-auto xl:mx-0">
        <div className="flex items-center rounded-full bg-white-blue/50 p-1">
          <input
            type="email"
            placeholder={newsletter.placeholder}
            className="flex-1 bg-transparent px-4 text-sm text-secondary outline-none w-full"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-5 py-3 text-sm font-normal text-secondary transition-colors duration-300 hover:bg-secondary hover:text-white">
            {newsletter.buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}
