import { Component, OnInit } from '@angular/core';
import { AgendamentosService } from 'src/app/servicos/agendamentos.service';
import { Agendamento } from 'src/app/models/agendamento';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage implements OnInit {

  public listaAgendamentos: Agendamento[] = [];

  constructor(private agendamentoService: AgendamentosService) { }

  public buscarAgenda() {
    this.listaAgendamentos = [];

    this.agendamentoService.getAll().subscribe(dados => {
      this.listaAgendamentos = dados.map(registro => {
        console.log(registro);
        return {
          $key: registro.payload.doc.id,
          data: registro.payload.doc.data()['data'],
          hora: registro.payload.doc.data()['hora'],
          profissional: registro.payload.doc.data()['profissional'],
          tipoCorte: registro.payload.doc.data()['tipoCorte']
        } as Agendamento;
      })
    });
    
  }

  async ionViewWillEnter() {
    await this.buscarAgenda();
  }
  
  public deletar(key: string){
    this.agendamentoService.delete(key);
    this.buscarAgenda();

  }
  ngOnInit() {
  }

}
