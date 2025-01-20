import { TransactionDto } from "./transfer.dto"

export function transferQueryFilter(queryParam: TransactionDto){
  let param = {}

  if(queryParam.transaction_code){
    param = {
      ...param,
      transferCode: { contains: String(queryParam.transaction_code) }
    }
  }
  if(queryParam.username){
    param = {
      ...param,
      AND: [
        {
          OR: [
            {
              toUser: {
                username: { contains: String(queryParam.username) }
              }
            },
            {
              fromUser: {
                username: { contains: String(queryParam.username) }
              }
            }
          ],
        }
      ]
    }
  }

  return param
}