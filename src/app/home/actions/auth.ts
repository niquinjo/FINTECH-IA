"use server"

export async function registerUser(
  prevState: { success: boolean; error: string } | null,
  formData: FormData
) {
  console.log("JA RECEBI");
  const email = formData.get("email") as string;

  console.log(email)
  
  return { success: true, error: "" };
}