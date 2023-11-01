import parser from "./parser"

const main = async (): Promise<void> => {
  console.log(await parser())
}
main()