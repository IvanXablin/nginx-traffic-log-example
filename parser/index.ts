import fs from "fs/promises"
import { TrafficAccountingID } from "./types"
import { pathToLogs, regexNumber } from "./shared"

const main = async (): Promise<void> => {
  const arrayOfTrafficAccountingID: TrafficAccountingID[] = []

  const logs = await fs.readFile(pathToLogs, { encoding: "utf8" })
  const arrayOfLogs = logs.split('\n')
  
  const arrayOfFilteredLogs = arrayOfLogs.filter(
    (item: string) => !item.includes('start http') && !item.includes('stop http')
  )

  for (let line of arrayOfFilteredLogs) {
    const traffic: TrafficAccountingID = {
      from: 0,
      to: 0,
      accounting_id: '',
      requests: 0,
      bytes_in: 0,
      bytes_out: 0
    }

    if (line === '') {
      continue
    }

    for (let item of line.split('|')) {
      
      if (item.includes('from')) {
        traffic.from = parseInt(item.replace(regexNumber, ''))
      }

      if (item.includes('to')) {
        traffic.to = parseInt(item.replace(regexNumber, ''))
      }

      if (item.includes('accounting_id')) {
        traffic.accounting_id = item.slice(item.indexOf(':') + 1, item.length)
      }

      if (item.includes('requests')) {
        traffic.requests = parseInt(item.replace(regexNumber, ''))
      }

      if (item.includes('bytes_in')) {
        traffic.bytes_in = parseInt(item.replace(regexNumber, ''))
      }

      if (item.includes('bytes_out')) {
        traffic.bytes_out = parseInt(item.replace(regexNumber, ''))
      }
      
      else {
        continue
      }
    }
    arrayOfTrafficAccountingID.push(traffic)
  }
  console.log(arrayOfTrafficAccountingID)
}

main()