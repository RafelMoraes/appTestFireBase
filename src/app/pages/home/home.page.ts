import { Component, OnInit } from '@angular/core';

import { AgendamentosService } from 'src/app/servicos/agendamentos.service';
import { Agendamento } from 'src/app/models/agendamento';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  [x: string]: any;

  public agenda: Agendamento = { };

  constructor(private agendamentoservice: AgendamentosService, public alertCtrl: AlertController ) { }


  public async agendar() {
    const agendamento = new Agendamento();
    agendamento.data = this.agenda.data;
    agendamento.hora = this.agenda.hora;
    agendamento.profissional = this.agenda.profissional;
    agendamento.tipoCorte = this.agenda.tipoCorte;

    await this.agendamentoservice.create(agendamento).then(resposta => {
      console.log(resposta);
    }).catch(erro => { this.presentAlert('ERRO!', "Erro ao salvar");
    console.log('ERRO: ', erro);
    });

  }


  ngOnInit() {
  }

}
