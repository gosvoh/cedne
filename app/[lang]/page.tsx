import Image from "next/image";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjects, getTeam } from "@/lib/serverActions";

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const projects = await getProjects(params.lang);
  const team = await getTeam(params.lang);

  projects.length = 0;

  return (
    <>
      <header className="relative mb-14 max-sm:h-72 max-md:h-128 max-lg:h-144 max-xl:h-160 h-64 w-full">
        <Image
          src="/header.png"
          alt="CEdNe header image"
          fill
          className="object-cover"
        />
      </header>

      <main className="lg:w-1/2 max-lg:p-8 mx-auto">
        <section>
          <h1 className="font-bold text-3xl mb-4">{dict.home.title}</h1>
          {dict.home.description.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>

        <Separator className="my-8" />

        <section>
          <h2 className="font-bold text-2xl mb-4">{dict.home.projectsTitle}</h2>
          <div
            className="flex flex-wrap gap-10 justify-items-center
          "
          >
            {projects.length === 0 &&
              Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-60 flex-1 max-sm:flex-none basis-5/12
              "
                />
              ))}
            {projects.length !== 0 &&
              projects.map((project) => (
                <div
                  key={project.id}
                  className="w-full h-60 flex-1 max-sm:flex-none basis-5/12 flex flex-col"
                >
                  <div className="relative flex-1">
                    <Image
                      src={`/assets/${project.id}.jpg`}
                      alt={project.name}
                      fill
                      className="object-cover -z-10"
                    />
                  </div>
                  <h3
                    className="font-bold text-xl bg-neutral-700 text-white p-2
                  "
                  >
                    {project.name}
                  </h3>
                </div>
              ))}
          </div>
        </section>

        <Separator className="my-8" />

        <section>
          <h2 className="font-bold text-2xl mb-4">{dict.home.teamTitle}</h2>
          <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-3 gap-x-4 gap-y-10 justify-items-center">
            {Array.from({ length: 11 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="w-32 h-32 rounded-full" />
                <Skeleton className="w-3/4 h-4 mt-2" />
                <Skeleton className="w-1/2 h-4 mt-2" />
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />
      </main>
    </>
  );
}
