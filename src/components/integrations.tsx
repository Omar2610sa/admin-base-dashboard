export default function Integrations() {
  return (

    <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
      {integrations.map((integration) => (
        <div
          className="relative flex flex-col items-start border bg-card p-8"
          key={integration.title}
        >
          {/* Decorative borders */}
          <div className="absolute inset-x-0 bottom-0 h-2 w-full" />
          <div className="absolute inset-x-0 top-0 h-2 w-full " />
          <div className="absolute inset-y-0 left-0 h-full w-2 " />
          <div className="absolute inset-y-0 right-0 h-full w-2 " />
          
          
          <div className="flex justify-between items-center gap-6">
            <h3 className="mt-5 font-medium text-xl">{integration.title}</h3>
            <img
              alt={integration.title}
              className="size-10 rounded"
              src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(integration.url)}&sz=64`}
            />
          </div>
          <p className="mt-1.5 text-pretty text-muted-foreground tracking-normal">
            {integration.description}
          </p>
        </div>
      ))}
    </div>
  );
}

const integrations = [
  {
    title: "PostHog",
    description: "1234",
    url: "https://posthog.com/",
  },
  {
    title: "Mailchimp",
    description:
      "1234",
    url: "https://mailchimp.com",
  },
  {
    title: "Webflow",
    description: "12344",
    url: "https://webflow.com/",
    status: "pending",
  },
  {
    title: "Stripe",
    description: "111",
    url: "https://stripe.com",
  },

];
