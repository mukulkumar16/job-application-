//@ts-nocheck
export default function DeleteCompany({id}){

    async function handleDelete(){
        const res = await fetch("/api/company/" + id , {
            method : "DELETE"
        });

        const data = await res.json();
        if(data.success){
            alert("company deleted");
        }

    }

    return (
        <div>
            <button onClick={handleDelete}>Delete Comapny</button>
        </div>
    )

}