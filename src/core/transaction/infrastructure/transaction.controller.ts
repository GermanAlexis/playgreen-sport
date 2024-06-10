import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/common/guards/auth.guard';
import { TransactionService } from '../application/transaction.service';
import { SearchTransactionDto } from '../dtos/search.dto';

@Controller('transactions')
@ApiTags('Transactions')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() searchTransaction: SearchTransactionDto) {
    return this.transactionService.getTransaction(searchTransaction);
  }
}
