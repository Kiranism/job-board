import { formatIndianCurrency } from "@/lib/utils";
import { Job } from "./context/JobContext";
import Button from "./form/Button";
import DeleteJobBtn from "./form/DeleteJobBtn";
import Modal from "./form/Modal";

type CardProps = {
  item: Job;
};

export default function Card({ item }: CardProps) {
  const minSalary = formatIndianCurrency(item.salary.min);
  const maxSalary = formatIndianCurrency(item.salary.max);
  return (
    <div className="flex relative text-fontdark gap-2 border border-cardborder bg-cardcolor rounded-lg max-w-[830px]  h-[320px] py-4 px-6">
      <div className="w-10">
        <img src="/logo.png" />
      </div>
      <div className="w-fit">
        <div className="mb-6">
          <h1 className="text-2xl font-normal">{item.jobtitle}</h1>
          <h6 className="text-base">{item.company + " - " + item.industry}</h6>
          <h6 className="text-base text-placeholder">
            {item.location + ", " + item.remotetype}
          </h6>
        </div>
        <div className="flex gap-2 flex-col mb-6 text-base">
          <h6>Part-Time (9.00am - 5.00pm IST)</h6>
          <h6>
            Experience (
            {item.experience.min + "-" + item.experience.max + " years"})
          </h6>
          <h6>INR ⟨₹⟩ {minSalary + " - " + maxSalary + " / month"}</h6>
          <h6>{item.totalemployee} employees</h6>
        </div>
        <div className="flex gap-2">
          {item.applytype === "externalapply" ? (
            <Button className="py-2 px-4 text-primary border border-primary bg-[white] rounded-md">
              External Apply
            </Button>
          ) : (
            <Button>Quick Apply</Button>
          )}
        </div>
        <div className="absolute top-0 right-0 flex gap-1 m-4">
          <Modal isEdit={true} id={item.id} />
          <DeleteJobBtn id={item.id} />
        </div>
      </div>
    </div>
  );
}
