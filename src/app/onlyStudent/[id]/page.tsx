import { OnlyStudent } from "@/components/studentPage/OnlyStudent";


type onlyStudentProps = {
  params: { id: string }
}

export default function onlyStudent({ params }: onlyStudentProps) {

  return (
    <div className="max-w-7xl mx-auto p-2">
      <OnlyStudent id={params.id} />
    </div>
  )
}