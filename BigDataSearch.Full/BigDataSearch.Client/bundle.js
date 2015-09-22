require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
var sentiment = require('sentiment');
},{"sentiment":"sentiment"}],3:[function(require,module,exports){
module.exports={"abandonar":-2,"abandonado":-2,"abandonos":-2,"raptado":-2,"abdução":-2,"raptos":-2,"abominar":-3,"abominava":-3,"detestável":-3,"abomina":-3,"habilidades":2,"capacidade":2,"um quadro":1,"absentista":-1,"faltosos":-1,"absolver":2,"absolvidos":2,"absolve":2,"absolvendo":2,"absorvido":1,"Abuso":-3,"abusado":-3,"abusos":-3,"abusivo":-3,"aceitar":1,"aceitaram":1,"aceitando":1,"aceita":1,"acidente":-2,"acidental":-2,"acidentalmente":-2,"acidentes":-2,"realizar":2,"realizado":2,"realiza":2,"acusação":-2,"acusações":-2,"acusar":-2,"acusado":-2,"acusa":-2,"acusador":-2,"dor":-2,"realizável":1,"doendo":-2,"absolvido":2,"acrimonioso":-3,"ativo":1,"adequado":1,"admirar":3,"admirado":3,"admira":3,"admiração":3,"Admitem":-1,"admite":-1,"admitido":-1,"admoestar":-2,"admoestado":-2,"adotar":1,"Adota":1,"adorável":3,"adorar":3,"adorado":3,"adores":3,"avançado":1,"vantagem":2,"vantagens":2,"aventura":2,"aventuras":2,"aventuroso":2,"afetado":-1,"afeição":3,"afetuoso":3,"aflito":-1,"afrontada":-1,"com medo":-2,"agravar":-2,"agravado":-2,"agrava":-2,"agravante":-2,"agressão":-2,"agressões":-2,"agressivo":-2,"horrorizado":-2,"curioso":2,"agonizar":-3,"agonizado":-3,"agoniza":-3,"agonizante":-3,"concordar":1,"agradável":2,"acordado":1,"acordo":1,"concorda":1,"alarme":-2,"alarmado":-2,"alarmista":-2,"alarmistas":-2,"ai de mim":-1,"alerta":-1,"alienação":-2,"vivo":1,"alérgico":-2,"permitir":1,"sozinho":-2,"surpreender":2,"maravilhado":2,"Espanta":2,"incrível":4,"ambicioso":2,"ambivalente":-1,"divertir":3,"divertido":3,"divertimento":3,"divertimentos":3,"raiva":-3,"Angers":-3,"zangado":-3,"angústia":-3,"angustiado":-3,"animosidade":-2,"incomodar":-2,"aborrecimento":-2,"aborrecido":-2,"irritante":-2,"irrita":-2,"antagônico":-2,"anti":-1,"antecipação":1,"ansiedade":-2,"ansioso":-2,"apático":-3,"apatia":-3,"apeshit":-3,"apocalíptico":-2,"desculpar":-1,"desculpou":-1,"pede desculpas":-1,"desculpando":-1,"desculpa":-1,"consternado":-2,"apavorante":-2,"apaziguar":2,"apaziguado":2,"apazigua":2,"apaziguando":2,"aplaudir":2,"aplaudido":2,"aplaudindo":2,"aplaude":2,"aplauso":2,"apreciar":2,"apreciado":2,"aprecia":2,"apreciando":2,"valorização":2,"apreensivo":-2,"aprovação":2,"aprovado":2,"aprova":2,"ardente":1,"prender":-2,"preso":-3,"prisões":-2,"arrogante":-2,"uma vergonha":-2,"envergonhado":-2,"burro":-4,"assassinato":-3,"assassinatos":-3,"de ativos":2,"ativos":2,"assfucking":-4,"Idiota":-4,"atônito":2,"estupefacto":3,"espantoso":3,"espantosamente":3,"alucinantes":3,"ataque":-1,"atacado":-1,"atacar":-1,"ataques":-1,"atrai":1,"atraídos":1,"atraindo":2,"atração":2,"atrações":2,"audacioso":3,"autoridade":1,"evitar":-1,"evitado":-1,"averts":-1,"ávido":2,"Evita":-1,"aguardam":-1,"esperado":-1,"Aguarda":-1,"prêmio":3,"premiado":3,"prêmios":3,"impressionante":4,"terrível":-3,"desajeitado":-2,"machado":-1,"axed":-1,"Apoiado":1,"apoio":2,"backs":1,"mau":-3,"mauzão":-3,"mal":-3,"resgate":-2,"enganar":-2,"enganado":-2,"Bamboozles":-2,"banimento":-2,"banir":-1,"falido":-3,"bankster":-3,"banido":-2,"barganha":2,"barreira":-2,"Desgraçado":-5,"bastardos":-5,"batalha":-1,"batalhas":-1,"espancado":-2,"beatífico":3,"espancamento":-1,"belezas":3,"bela":3,"lindamente":3,"embelezar":3,"desmerecer":-2,"menosprezada":-2,"amado":3,"benefício":2,"benefícios":2,"Beneficiado":2,"beneficiando":2,"privar":-2,"enlutado":-2,"bereaves":-2,"bereaving":-2,"o melhor":3,"trair":-3,"traição":-3,"traída":-3,"traiçoeiro":-3,"atraiçoa":-3,"melhor":2,"viés":-1,"tendenciosa":-2,"grande":1,"cadela":-5,"cadelas":-5,"amargo":-2,"amargamente":-2,"bizarro":-2,"blah":-2,"culpa":-2,"culpou":-2,"culpando":-2,"abençoar":2,"abençoa":2,"bênção":3,"cego":-1,"felicidade":3,"bem-aventurado":3,"alegre":2,"bloco":-1,"sucesso":3,"bloqueado":-1,"bloqueando":-1,"blocos":-1,"sangrento":-3,"embaçado":-2,"fanfarrão":-2,"corajoso":2,"audaciosamente":2,"bomba":-1,"impulso":1,"impulsionou":1,"impulsionar":1,"aumenta":1,"calibre":-2,"entediado":-2,"chato":-3,"incomodados":-2,"incomoda":-2,"enfadonho":-2,"boicote":-2,"boicotaram":-2,"boicotando":-2,"boicotes":-2,"lavagem cerebral":-3,"bravo":2,"avanço":3,"empolgante":5,"suborno":-3,"brilhante":1,"mais brilhante":2,"brilho":1,"quebrou":-1,"quebrado":-1,"ninhada":-2,"intimidado":-2,"besteira":-4,"valentão":-2,"assédio moral":-2,"vadio":-2,"flutuante":2,"fardo":-2,"sobrecarregados":-2,"sobrecarregando":-2,"encargos":-2,"calma":2,"acalmou":2,"calmante":2,"calmarias":2,"não pode ficar":-3,"cancelar":-1,"cancelado":-1,"cancelando":-1,"cancela":-1,"câncer":-1,"capaz":1,"cativado":3,"cuidado":2,"despreocupado":1,"cuidadoso":2,"cuidadosamente":2,"descuidado":-2,"cuidados":2,"lucrando":-2,"catástrofe":-3,"catastrófico":-4,"cauteloso":-1,"comemoro":3,"célebre":3,"Comemora":3,"a comemorar":3,"censor":-2,"censurado":-2,"censores":-2,"certo":1,"desgosto":-2,"chagrined":-2,"desafio":-1,"chance":2,"chances":2,"caos":-2,"caótico":-2,"carregada":-3,"encanto":3,"charmoso":3,"charmless":-3,"punir":-3,"castigou":-3,"chastises":-3,"castigar":-3,"enganação":-3,"trapaceiro":-3,"cheaters":-3,"fraudes":-3,"alegria":2,"aplaudiram":2,"cheering":2,"triste":-2,"Saúde":2,"acalentar":2,"querido":2,"acalenta":2,"acalentando":2,"chique":2,"infantil":-2,"chilling":-1,"afogador":-2,"engasgou":-2,"engasga":-2,"asfixia":-2,"clarifica":2,"clareza":2,"choque":-2,"classy":3,"limpo":2,"limpador":2,"Claro":1,"apuradas":1,"claramente":1,"limpa":1,"esperto":2,"nublado":-1,"nora":-2,"galo":-5,"cocksucker":-5,"cocksuckers":-5,"pretensioso":-2,"coagidos":-2,"colapso":-2,"desabou":-2,"colapsos":-2,"colidir":-1,"colide":-1,"colidindo":-1,"colisão":-2,"colisões":-2,"conspirando":-3,"combate":-1,"combates":-1,"comédia":1,"conforto":2,"confortável":2,"reconfortante":2,"confortos":2,"elogiar":2,"Elogiado":2,"cometer":1,"compromisso":2,"compromete-":1,"comprometido":1,"cometendo":1,"compassivo":2,"obrigado":1,"competente":2,"competitivo":2,"complacente":-2,"queixar-se":-2,"queixaram":-2,"reclama":-2,"abrangente":2,"conciliar":2,"conciliada":2,"concilia":2,"conciliando":2,"condenar":-2,"condenação":-2,"condenado":-2,"Condena":-2,"confiança":2,"confiante":2,"conflito":-2,"conflitantes":-2,"conflitivo":-2,"conflitos":-2,"confundir":-2,"confuso":-2,"congrats":2,"parabenizar":2,"parabéns":2,"consentimento":2,"consentimentos":2,"consolável":2,"conspiração":-3,"constrangido":-2,"contágio":-2,"contagions":-2,"contagioso":-1,"desprezo":-2,"desdenhoso":-2,"desdenhosamente":-2,"contender":-1,"contendor":-1,"contendendo":-1,"contencioso":-2,"contestável":-2,"controverso":-2,"controversamente":-2,"convencer":1,"convencido":1,"convence":1,"jovial":2,"frio":1,"coisas legais":3,"encurralado":-2,"cadáver":-1,"dispendioso":-2,"coragem":2,"cortês":2,"cortesia":2,"cobrir":-3,"covarde":-2,"covardemente":-2,"aconchego":2,"cãibra":-1,"porcaria":-3,"crazier":-2,"mais louca":-2,"louco":-2,"criativo":2,"cabisbaixo":-2,"chorou":-2,"gritos":-2,"crime":-3,"criminal":-3,"criminosos":-3,"crise":-3,"crítico":-2,"crítica":-2,"criticar":-2,"criticada":-2,"critica":-2,"criticando":-2,"críticos":-2,"cruel":-3,"crueldade":-3,"esmagamento":-1,"esmagado":-2,"esmaga":-1,"esmagador":-1,"chora":-1,"chorando":-2,"cona":-5,"maldição":-1,"corte":-1,"fofa":2,"cortes":-1,"cínico":-2,"cinismo":-2,"dano":-3,"danos":-3,"Droga":-4,"danado":-4,"caramba":-4,"perigo":-2,"temerário":2,"ousado":2,"mais escura":-2,"escuridão":-1,"destemido":2,"morto":-3,"impasse":-2,"ensurdecedor":-1,"Prezada":2,"caro":3,"morte":-2,"afável":2,"dívida":-2,"engano":-3,"enganador":-3,"engana":-3,"iludindo":-3,"decisivo":1,"dedicado":2,"derrotado":-2,"defeito":-3,"defeitos":-3,"defensor":2,"defensores":2,"sem defesa":-2,"diferir":-1,"adiando":-1,"desafiador":-1,"déficit":-2,"degradar":-2,"degradante":-2,"degrada":-2,"desumanizar":-2,"desumanizado":-2,"desumaniza":-2,"desumanizante":-2,"deprimir":-2,"abatido":-2,"dejecting":-2,"dejetos":-2,"atraso":-1,"atrasado":-1,"delícia":3,"Encantado":3,"deliciando":3,"delícias":3,"exigem":-1,"exigiu":-1,"exigente":-1,"demandas":-1,"demonstração":-1,"desmoralizado":-2,"negado":-2,"denier":-2,"negadores":-2,"nega":-2,"denunciar":-2,"denuncia":-2,"negar":-2,"negando":-2,"deprimido":-2,"deprimente":-2,"descarrilhar":-2,"descarrilou":-2,"descarrila":-2,"ridicularizar":-2,"ridicularizado":-2,"derides":-2,"Deriding":-2,"escárnio":-2,"desejável":2,"desejo":1,"desejado":2,"desejoso":2,"desespero":-3,"desesperando":-3,"desesperos":-3,"desesperado":-3,"desesperadamente":-3,"desanimado":-3,"destruir":-3,"destruído":-3,"destruindo":-3,"destrói":-3,"destruição":-3,"destrutivo":-3,"destacado":-1,"deter":-2,"detido":-2,"detenção":-2,"determinado":2,"devastar":-2,"devastado":-2,"devastador":-2,"devotado":3,"diamante":1,"pênis":-4,"dickhead":-4,"morrer":-3,"morreu":-3,"difícil":-1,"tímido":-2,"dilema":-1,"dipshit":-3,"horrendo":-3,"medonho":-3,"sujeira":-2,"dirtier":-2,"dirtiest":-2,"sujo":-2,"desativando":-1,"desvantagem":-2,"desfavorecidos":-2,"desaparecer":-1,"desaparecido":-1,"desaparece":-1,"decepcionar":-2,"desapontado":-2,"decepcionante":-2,"desapontamento":-2,"decepções":-2,"desilude":-2,"desastre":-2,"desastres":-2,"desastroso":-3,"descrer":-2,"descartar":-1,"descartados":-1,"devoluções":-1,"desconsolado":-2,"desconsolo":-2,"descontente":-2,"discórdia":-2,"descontado":-1,"desencorajado":-2,"desacreditada":-2,"desdém":-2,"desgraça":-2,"desonrado":-2,"disfarçar":-1,"disfarçado":-1,"disfarces":-1,"disfarce":-1,"enojado":-3,"repugnante":-3,"desmotivada":-2,"desonesto":-2,"desiludidos":-2,"disinclined":-2,"desarticulado":-2,"antipatia":-2,"sombrio":-2,"desordem":-2,"desorganizado":-2,"desorientado":-2,"denegrir":-2,"menosprezou":-2,"deprecie":-2,"depreciativo":-2,"disputa":-2,"disputado":-2,"disputas":-2,"contestando":-2,"desqualificado":-2,"inquietação":-2,"negligência":-2,"desconsiderada":-2,"desconsiderando":-2,"desconsideração":-2,"desrespeito":-2,"desrespeitado":-2,"rompimento":-2,"rupturas":-2,"disruptivo":-2,"insatisfeito":-2,"distorcer":-2,"distorcida":-2,"distorcendo":-2,"distorce":-2,"distrair":-2,"distraído":-2,"distração":-2,"distrai":-2,"aflição":-2,"angústias":-2,"aflitivo":-2,"desconfiança":-3,"desconfiado":-3,"perturbar":-2,"perturbado":-2,"perturbador":-2,"distúrbios":-2,"pontilhado":-2,"tonto":-1,"esquivando-se":-2,"espertalhão":-2,"não funciona":-3,"doloroso":-2,"não gosto":-2,"dúvida":-1,"duvidou":-1,"duvidoso":-1,"dúvidas":-1,"ducha":-3,"babaca":-3,"downhearted":-2,"downside":-2,"arrasto":-1,"arrastaram":-1,"arrasta":-1,"drenado":-2,"pavor":-2,"temido":-2,"temendo":-2,"sonhar":1,"sonhos":1,"caído":-2,"solta":-1,"afogar":-2,"afogado":-2,"se afoga":-2,"bêbado":-2,"boato":-2,"embotar":-2,"lixeira":-1,"despejado":-2,"dumps":-1,"joguete":-2,"disfunção":-2,"sério":2,"facilidade":2,"fácil":1,"extático":4,"misterioso":-2,"eficaz":2,"eficazmente":2,"exultante":3,"elação":3,"elegante":2,"elegantemente":2,"embaraçar":-2,"embaraça":-2,"embaraçoso":-2,"embaraço":-2,"amargurado":-2,"abraçar":1,"emergência":-2,"empática":2,"vazio":-1,"enchanted":2,"encorajar":2,"encorajado":2,"encorajamento":2,"encoraja":2,"endossar":2,"endossou":2,"endosso":2,"inimigos":-2,"inimigo":-2,"enérgico":2,"engajar":1,"engata":1,"absortos":1,"desfrutando":2,"goza":2,"iluminar":2,"esclarecido":2,"esclarecedor":2,"enlightens":2,"tédio":-2,"enraivecer":-2,"enfurecidos":-2,"Enragés":-2,"enraging":-2,"arrebatar":3,"escravizar":-2,"escravizados":-2,"escraviza":-2,"garantir":1,"assegurando":1,"empreendedor":1,"encantar":3,"entusiasmado":3,"intitulado":1,"confiada":2,"invejas":-1,"invejoso":-2,"inveja":-1,"errôneo":-2,"erro":-2,"erros":-2,"fuga":-1,"escapes":-1,"escapando":-1,"esteemed":2,"ético":2,"euforia":3,"eufórico":4,"despejo":-1,"exagerar":-2,"exagerado":-2,"exagera":-2,"exagerando":-2,"exasperado":2,"excelência":3,"excelente":3,"excitar":3,"animado":3,"excitação":3,"emocionante":3,"excluir":-1,"excluídos":-2,"exclusão":-1,"exclusivo":2,"isento":-1,"esgotado":-2,"exhilarates":3,"exonerar":2,"exonerado":2,"exonera":2,"exonerando":2,"expandir":1,"expande":1,"expelir":-2,"expulso":-2,"expelindo":-2,"Expele":-2,"explorar":-2,"explorados":-2,"explorando":-2,"exploits":-2,"exploração":1,"explorações":1,"expor":-1,"exposto":-1,"expõe":-1,"expondo":-1,"ampliar":1,"estende-":1,"exuberante":4,"fabuloso":4,"mania":-2,"fag":-3,"bicha":-3,"bichas":-3,"falhou":-2,"fracassado":-2,"falta":-2,"falha":-2,"falhas":-2,"fainthearted":-2,"feira":2,"fé":1,"fiel":3,"falsificação":-3,"falsificações":-3,"queda":-1,"falsificados":-3,"falsificar":-3,"fama":1,"ventilador":3,"fantástico":4,"farsa":-1,"fascinar":3,"fascinado":3,"fascina":3,"fascinante":3,"fascista":-2,"fascistas":-2,"fatalidades":-3,"fatalidade":-3,"fadiga":-2,"fatigado":-2,"fadigas":-2,"fatigante":-2,"favorecer":2,"favorecido":2,"favorito":2,"favoritos":2,"favores":2,"medo":-2,"temeroso":-2,"Engordou":-3,"débil":-2,"sentindo-me":1,"crimes":-3,"fervente":2,"festivo":2,"fiasco":-3,"inquieto":-2,"luta":-1,"bem":2,"fogo":-2,"disparamos":-2,"acendimento":-2,"caber":1,"ginástica":1,"navio almirante":2,"foge":-1,"falhanços":-2,"gripe":-2,"afobado":-2,"focado":2,"afeiçoado":2,"carinho":2,"tolo":-2,"tolos":-2,"forçado":-1,"foreclosure":-2,"foreclosures":-2,"esqueço":-1,"esquecido":-2,"perdoar":1,"indulgente":1,"afortunado":2,"frenético":-1,"fraude":-4,"fraudador":-4,"fraudadores":-4,"fraudulência":-4,"fraudulento":-4,"livre":1,"liberdade":2,"frenesi":-3,"fresca":1,"amigáveis":2,"susto":-2,"assustado":-2,"assustadora":-3,"frikin":-2,"brincalhão":2,"carrancudo":-1,"frustrar":-2,"frustrado":-2,"frustra":-2,"frustrante":-2,"frustração":-2,"ftw":3,"Porra":-4,"fodido":-4,"Fuckers":-4,"fuckface":-4,"fuckhead":-4,"fucktard":-4,"fud":-3,"fuked":-4,"fuking":-4,"Preencha":2,"realizada":2,"fulfills":2,"fumegando":-2,"Diversão":4,"funeral":-1,"funerais":-1,"descolados":2,"mais engraçado":4,"engraçado":4,"furioso":-3,"fútil":2,"mordaça":-2,"amordaçado":-2,"ganho":2,"ganhou":2,"ganhar":2,"ganhos":2,"valente":3,"galantemente":3,"bravura":3,"generoso":2,"genial":3,"fantasma":-1,"vertiginoso":-2,"Presente":2,"feliz":3,"melancolia":-1,"glorioso":2,"glória":2,"sorumbático":-2,"Deus":1,"maldita":-3,"dádiva":4,"Boa":3,"bondade":3,"graça":1,"gracioso":3,"conceder":1,"concedido":1,"concessão":1,"subvenções":1,"grato":3,"gratificação":2,"grave":-2,"cinza":-1,"ótimo":3,"maior":3,"cobiça":-3,"ganancioso":-2,"lavagem verde":-3,"greenwash":-3,"greenwasher":-3,"greenwashers":-3,"greenwashing":-3,"cumprimentar":1,"saudados":1,"saudação":1,"cumprimentos":2,"Cumprimenta":1,"entristeceu":-2,"bruto":-2,"crescente":1,"crescimento":2,"garantia":1,"culpado":-3,"credulidade":-2,"crédulo":-2,"pistola":-1,"ha":2,"hackeado":-1,"haha":3,"ra Ra ra":3,"hahahah":3,"saudar":2,"saudada":2,"infeliz":-2,"infelicidade":-2,"duro":-1,"hardier":2,"dificuldade":-2,"prejudicada":-2,"prejudicial":-2,"harming":-2,"Harms":-2,"harried":-2,"áspero":-2,"mais duras":-2,"mais severos":-2,"odiar":-3,"odiava":-3,"odiadores":-3,"ódios":-3,"odiando":-3,"assombro":-1,"assombrada":-2,"assombrando":1,"assombrações":-1,"saudável":2,"desolador":-3,"coração quebrado":-3,"sincero":3,"céu":2,"celestial":4,"coração pesado":-2,"inferno":-4,"Socorro":2,"útil":2,"ajudando":2,"desamparado":-2,"ajuda":2,"herói":2,"Heróis":2,"heróico":3,"hesitante":-2,"hesitar":-2,"escondeu":-1,"esconder":-1,"couros":-1,"escondendo":-1,"realçar":2,"hilário":2,"obstáculo":-2,"com saudades de casa":-2,"honesto":2,"honra":2,"honrado":2,"honrando":2,"hooliganismo":-2,"arruaceiros":-2,"esperança":2,"esperançoso":2,"esperançosamente":2,"sem esperança":-2,"esperanças":2,"esperando":2,"horrível":-3,"hostil":-2,"mascate":-2,"abraço":2,"enorme":1,"abraços":2,"cómico":3,"humilhado":-3,"humilhação":-3,"humor":2,"fome":-2,"hurra":5,"ferido":-2,"machucando":-2,"dói":-2,"hipócrita":-2,"histeria":-3,"histérico":-3,"ignorância":-2,"ignorante":-2,"ignorar":-1,"ignorados":-2,"ignora":-1,"doente":-2,"ilegal":-3,"analfabetismo":-2,"doença":-2,"doenças":-2,"imbecil":-3,"imobilizado":-1,"imortal":2,"imune":1,"impaciente":-2,"eu sou perfeita":-2,"importância":2,"importante":2,"impor":-1,"imposta":-1,"impõe":-1,"imponente":-1,"impotente":-2,"impressionar":3,"impressionado":3,"impressiona":3,"melhorar":2,"melhorado":2,"melhoria":2,"melhora":2,"melhorando":2,"incapacidade":-2,"em ação":-2,"inadequado":-2,"incapaz":-2,"incapacitado":-2,"incensado":-2,"incompetência":-2,"incompetente":-2,"inconsiderado":-2,"inconveniente":-2,"aumentar":1,"aumento":1,"indeciso":-2,"indestrutível":2,"indiferença":-2,"indiferente":-2,"indignado":-2,"indignação":-2,"doutrinar":-2,"doutrinados":-2,"doutrina":-2,"ineficaz":-2,"apaixonado":2,"paixão":2,"infectado":-2,"inferior":-2,"inflamado":-2,"influente":2,"violação":-2,"enfurecer":-2,"enfureceu":-2,"enfurece":-2,"enfurecedor":-2,"inibir":-1,"prejuízo":-2,"injustiça":-2,"inovar":1,"inova":1,"inovação":1,"inovador":2,"inquisição":-2,"inquisitivo":2,"insano":-2,"insanidade":-2,"inseguro":-2,"insensível":-2,"insensibilidade":-2,"insignificante":-2,"insípido":-2,"inspiração":2,"inspirador":2,"inspirar":2,"inspirado":2,"inspira":2,"insulto":-2,"insultados":-2,"insultuoso":-2,"insultos":-2,"intacto":2,"integridade":2,"inteligente":2,"intenso":1,"interesse":1,"interessado":2,"interessante":2,"interesses":1,"interrogados":-2,"interromper":-2,"interrompeu":-2,"interrompendo":-2,"interrupção":-2,"interrupções":-2,"intimidar":-2,"intimidados":-2,"intimida":-2,"intimidante":-2,"intimidação":-2,"intricado":2,"intrigas":1,"invencível":2,"convidar":1,"convidativo":1,"invulnerável":2,"enfurecido":-3,"irônico":-1,"ironia":-1,"irracional":-1,"irresistível":2,"irresoluto":-2,"irresponsável":2,"irreversível":-1,"irritar":-3,"irritada":-3,"isolado":-1,"sarnento":-2,"asno":-4,"jackasses":-4,"desenvolto":2,"ciumento":-2,"Jesus":1,"jóia":1,"jóias":1,"jocoso":2,"Junte-se":1,"piada":2,"piadas":2,"alegremente":3,"jubilante":3,"saltitante":-1,"justiça":2,"justificadamente":2,"justificado":2,"afiado":1,"matar":-3,"assassinado":-3,"matança":-3,"mortes":-3,"tipo":2,"kinder":2,"beijo":2,"lackadaisical":-2,"defasada":-2,"defasagens":-2,"coxo":-2,"ponto de referência":2,"riso":1,"riu":1,"rindo":1,"risos":1,"laughting":1,"lançado":1,"lawl":3,"ação judicial":-2,"ações judiciais":-2,"preguiçoso":-1,"vazamento":-1,"vazaram":-1,"deixar":-1,"legal":1,"legalmente":1,"leniente":1,"letárgico":-2,"letargia":-2,"mentiroso":-3,"mentirosos":-3,"difamatório":-2,"mentiu":-2,"salva-vidas":4,"lighthearted":1,"Como":2,"Gostou":2,"gostos":2,"limitação":-1,"limitado":-1,"limites":-1,"litígio":-1,"litigioso":-2,"lívido":-2,"lmao":4,"lmfao":4,"detestar":-3,"detestado":-3,"loathes":-3,"repugnância":-3,"entrada":-2,"lobbying":-2,"ri muito":3,"solitário":-2,"saudade":-1,"tear":-1,"assomava":-1,"iminente":-1,"teares":-1,"solto":-3,"perde":-3,"perdedor":-3,"a perderem":-3,"perda":-3,"perdido":-3,"Ame":3,"lovelies":3,"amoroso":2,"menor":-1,"leal":3,"lealdade":3,"sorte":3,"felizmente":3,"por sorte":3,"lúgubre":-2,"lunático":-3,"lunáticos":-3,"espreitar":-1,"à espreita":-1,"espreita":-1,"enlouquecedora":-3,"decidir":-1,"loucamente":-3,"loucura":-3,"obrigatório":-1,"manipulado":-1,"manipulação":-1,"maravilha":3,"maravilhoso":3,"maravilhas":3,"Obra-prima":4,"obras-primas":4,"importam":1,"assuntos":1,"maduro":2,"significativo":2,"sem sentido":-2,"medalha":3,"mediocridade":-3,"meditativo":1,"ameaça":-2,"ameaçado":-2,"misericórdia":2,"confusão":-2,"desarrumada":-2,"estragando tudo":-2,"metódico":2,"estúpido":-2,"milagre":4,"mirthfully":3,"portar-se mal":-2,"comportado mal":-2,"misbehaves":-2,"misbehaving":-2,"travessura":-1,"mischiefs":-1,"miserável":-3,"miséria":-2,"apreensão":-2,"informação errada":-2,"mal informado":-2,"mal interpretado":-2,"ler mal":-1,"misreporting":-2,"deturpação":-2,"esquecidas":-2,"ausência de":-2,"equivocando":-2,"entender mal":-2,"mal-entendido":-2,"misunderstands":-2,"incompreendido":-2,"gemido":-2,"gemeu":-2,"gemendo":-2,"gemidos":-2,"zombaria":-2,"zombou":-2,"zombeteiro":-2,"mocks":-2,"fautor":-2,"monopolizar":-2,"monopolizado":-2,"monopoliza":-2,"monopolização":-2,"temperamental":-1,"lastimador":-1,"lastimando":-1,"filho da puta":-5,"motivar":1,"motivada":2,"motivador":2,"motivação":1,"chorar":-2,"pranteado":-2,"pesaroso":-2,"luto":-2,"Lamentação":-2,"taciturno":-2,"assassino":-2,"mito":-1,"n00b":-2,"ingênuo":-2,"desagradável":-3,"natural":1,"carente":-2,"negativo":-2,"negatividade":-2,"negligenciadas":-2,"negligenciando":-2,"negligências":-2,"nervos":-1,"nervoso":-2,"nervosamente":-2,"estiloso":2,"manos":-5,"nigger":-5,"não":-1,"sem graça":-3,"nobre":2,"barulhento":-1,"disparate":-2,"novato":-2,"intrometido":-2,"não é bom":-2,"não está funcionando":-3,"notório":-2,"novela":2,"entorpecido":-1,"nozes":-3,"obliterar":-2,"obliterado":-2,"obsceno":-2,"obcecado":2,"obsoleto":-2,"obstáculos":-2,"obstinado":-2,"ímpar":-2,"ofender":-2,"ofendido":-2,"ofensor":-2,"ofende":-2,"off-line":-1,"OKS":2,"ameaçador":3,"uma vez na vida":3,"oportunidades":2,"oportunidade":2,"oprimida":-2,"opressivo":-2,"otimismo":2,"otimista":2,"optionless":-2,"clamor":-2,"outmaneuvered":-2,"ultraje":-3,"ultrajado":-3,"outreach":2,"radiante":4,"sobrecarga":-1,"negligenciado":-1,"exagerei":-2,"overreaction":-2,"overreacts":-2,"oversell":-2,"overselling":-2,"oversells":-2,"simplificação":-2,"simplificada":-2,"simplifica":-2,"simplificar":-2,"exagero":-2,"overstatements":-2,"excesso de peso":-1,"oxímoro":-1,"pânico":-3,"entrou em pânico":-3,"pânicos":-3,"paraíso":3,"paradoxo":-1,"perdão":2,"perdoado":2,"perdões":2,"negociação":-1,"passiva":-1,"passivamente":-1,"patético":-2,"pagar":-1,"Paz":2,"pacífico":2,"pacificamente":2,"pena":-2,"pensativo":-1,"perfeito":3,"aperfeiçoado":2,"perfeitamente":3,"aperfeiçoa":2,"perjúrio":-3,"perpetrador":-2,"perpetradores":-2,"perplexo":-2,"perseguir":-2,"perseguidos":-2,"persegue":-2,"persegues":-2,"maldito":-2,"pessimismo":-2,"pessimista":-2,"petrificada":-2,"fóbica":-2,"pitoresco":2,"acumular-se":-1,"melindre":-2,"despertado":-2,"mijo":-4,"mijado":-4,"pissing":-3,"lamentável":-2,"pitied":-1,"Por favor":1,"satisfeito":3,"prazer":3,"pronta":-2,"veneno":-2,"envenenado":-2,"venenos":-2,"poluir":-2,"poluído":-2,"poluidor-":-2,"poluidores":-2,"polui":-2,"pobre":-2,"mais pobre":-2,"mais pobres":-2,"popular":3,"positivo":2,"positivamente":2,"possessivo":-2,"adiar":-1,"adiada":-1,"adia":-1,"adiamento":-1,"pobreza":-1,"poderoso":2,"louvor":3,"elogiou":3,"louvores":3,"louvando":3,"rezar":1,"oração":1,"reza":1,"prblm":-2,"prblms":-2,"preparado":1,"pressão":-1,"pressionados":-2,"fingir":-1,"fingindo":-1,"finge":-1,"bonita":1,"impedido":-1,"prevenção":-1,"previne":-1,"picada":-5,"prisão":-2,"prisioneiro":-2,"prisioneiros":-2,"privilegiado":2,"proativa":2,"problema":-2,"problemas":-2,"aproveitador":-2,"progresso":2,"proeminente":2,"promessa":1,"prometido":1,"promessas":1,"promover":1,"Promovido":1,"promove":1,"promoção":1,"propaganda":-2,"processar":-1,"processado":-2,"prosecutes":-1,"prospecto":1,"perspectivas":1,"próspero":3,"proteger":1,"protegido":1,"protege":1,"protesto":-2,"manifestantes":-2,"protestando":-2,"protestos":-2,"orgulhoso":2,"orgulhosamente":2,"provocar":-1,"provocou":-1,"provoca":-1,"provocante":-1,"pseudociência":-3,"punido":-2,"pune":-2,"punitivo":-2,"confusa":-2,"trêmulo":-2,"questionável":-2,"questionou":-1,"interrogatório":-1,"racismo":-3,"racista":-3,"racistas":-3,"raivosa":-2,"chuvoso":-1,"discurso retórico":-3,"ranter":-3,"ranters":-3,"rants":-3,"estupro":-4,"estuprador":-4,"arrebatamento":2,"arrebatados":2,"êxtases":2,"arrebatador":4,"erupção cutânea":-2,"ratificado":2,"alcançar":1,"alcançado":1,"alcances":1,"atingindo":1,"tranqüilizar":1,"tranquilizado":1,"tranquiliza":1,"tranquilizador":2,"rebelião":-2,"recessão":-2,"imprudente":-2,"recomendar":2,"Recomenda-":2,"recomenda":2,"remido":2,"recusar":-2,"recusada":-2,"recusa":-2,"arrepender":-2,"arrependimentos":-2,"lamentava":-2,"Lamentando":-2,"rejeitar":-1,"rejeitados":-1,"rejeitando":-1,"rejeita":-1,"regozijar-se":4,"regozijou-se":4,"regozija":4,"regozijo":4,"descontraído":2,"implacável":-1,"aliviar":1,"aliviado":2,"relevos":1,"aliviando":2,"saboreando":2,"notável":2,"remorso":-2,"repulsa":-1,"repelidos":-2,"resgatado":2,"resgates":2,"ressentido":-2,"demitir-se":-1,"resignado":-1,"resignando":-1,"renuncia":-1,"resoluto":2,"resolver":2,"resolvido":2,"resolve":2,"resolvendo":2,"respeitado":2,"responsável":2,"responsivo":2,"repousante":2,"restaurar":1,"restaurado":1,"restaurações":1,"restaurando":1,"restringir":-2,"restringido":-2,"restringindo":-2,"restrição":-2,"restringe":-2,"retida":-1,"retardar":-2,"retardado":-2,"retiro":-1,"vingança":-2,"vingativo":-2,"reverenciado":2,"reviver":2,"revive":2,"recompensa":2,"recompensado":2,"recompensador":2,"recompensas":2,"rico":2,"ridículo":-3,"equipamento":-1,"fraudada":-1,"direcção certa":3,"rigoroso":3,"rigorosamente":3,"revolta":-2,"motins":-2,"risco":-2,"riscos":-2,"roubar":-2,"ladrão":-2,"robed":-2,"robing":-2,"rouba":-2,"robusto":2,"rofl":4,"roflcopter":4,"roflmao":4,"romance":2,"rotfl":4,"rotflmfao":4,"rotflol":4,"ruína":-2,"arruinado":-2,"arruinando":-2,"ruínas":-2,"sabotar":-2,"entristecer":-2,"entristecidos":-2,"tristemente":-2,"seguro":1,"seguramente":1,"segurança":1,"saliente":1,"viçoso":-1,"sarcástico":-2,"salvar":2,"salvo":2,"embuste":-2,"scams":-2,"escândalo":-3,"escandaloso":-3,"escândalos":-3,"bode expiatório":-2,"bodes expiatórios":-2,"assustador":-2,"cético":-2,"repreender":-2,"concha":3,"gritar":-2,"gritou":-2,"gritando":-2,"aparafusado":-2,"estragado":-3,"desprezível":-4,"garantido":2,"sedição":-2,"sedicioso":-2,"seduzido":-1,"autoconfiante":2,"auto-iludidos":-2,"egoísta":-3,"egoísmo":-3,"frase":-2,"sentenças":-2,"sentença":-2,"sereno":2,"sensual":3,"vergonha":-2,"envergonhou":-2,"vergonhoso":-2,"compartilhado":1,"ações":1,"despedaçado":-2,"merda":-4,"shithead":-4,"cagado":-3,"chocado":-2,"chocante":-2,"choques":-2,"atirar":-1,"míope":-2,"miopia":-2,"escassez":-2,"megera":-4,"suspiro":-2,"significado":1,"silenciamento":-1,"bobo":-1,"sinceramente":2,"sincerest":2,"sinceridade":2,"pecaminoso":-3,"singleminded":-2,"ceticismo":-2,"céticos":-2,"batida":-2,"reduzir":-2,"cortados":-2,"barras":-2,"arrasador":-2,"escravidão":-3,"insônia":-2,"escorregadio":2,"vigarista":2,"slickest":2,"lento":-2,"mais inteligente":2,"esfregaço":-2,"sorrir":2,"Sorriu":2,"sorrisos":2,"sorridente":2,"poluição":-2,"sorrateira":-1,"arrebitado":-2,"esnobado":-2,"snubbing":-2,"snubs":-2,"moderando":1,"solene":-1,"sólido":2,"solidariedade":2,"solução":1,"soluções":1,"solving":1,"algum tipo":0,"acalmar":3,"sofisticado":2,"dolorido":-1,"tristeza":-2,"Spam":-2,"spammer":-3,"spammers":-3,"spamming":-2,"faísca":1,"centelha":3,"brilhos":3,"espumante":3,"especulativo":-2,"espírito":1,"sem vida":-2,"rancoroso":-2,"esplêndido":3,"squelched":-1,"facada":-2,"esfaqueada":-2,"estável":2,"punhaladas":-2,"tenda":-2,"estagnou":-2,"stalling":-2,"vigor":2,"debandada":-2,"morrer de fome":-2,"Starved":-2,"morre de fome":-2,"firme":2,"roubos de bola":-2,"estereótipo":-2,"estereotipado":-2,"sufocada":-1,"estimular":1,"estimulado":1,"estimula":1,"estimulando":2,"mesquinho":-2,"roubado":-2,"Pare":-1,"parado":-1,"parando":-1,"stops":-1,"Em linha reta":1,"estranho":-1,"estranhamente":-1,"estrangulada":-2,"força":2,"fortalecer":2,"fortalecido":2,"fortalecimento":2,"fortalece":2,"estressado":-2,"estressor":-2,"estressores":-2,"greve":-1,"grevistas":-2,"greves":-1,"forte":2,"mais forte":2,"golpeou":-1,"lutava":-2,"lutas":-2,"lutando":-2,"teimoso":-2,"grudou":-2,"atordoado":-2,"deslumbrante":4,"estupidamente":-2,"suave":2,"substancial":1,"substancialmente":1,"subversivo":-2,"bem sucedido":3,"chupar":-3,"suga":-3,"sofrer":-2,"sofrimento":-2,"sofre":-2,"suicida":-2,"suicídio":-2,"processando":-2,"Amuado":-2,"luz do sol":2,"super":3,"soberbo":5,"superior":2,"suportado":2,"suporte":1,"apoiantes":1,"que apoia":1,"suportes":2,"sobrevivido":2,"sobrevivendo":2,"sobrevivente":2,"suspeito":-1,"suspeita":-1,"suspeitando":-1,"suspeitos":-1,"suspender":-1,"suspenso":-1,"jurar":-2,"juramento":-2,"jura":-2,"doce":2,"rápido":2,"rapidamente":2,"swindles":-3,"burla":-3,"compreensivo":2,"simpatia":2,"tard":-2,"lágrimas":-2,"proposta":2,"tenso":-2,"tensão":-1,"terrivelmente":-3,"formidável":4,"aterrorizado":-3,"terror":-3,"aterrorizar":-3,"aterrorizou":-3,"aterroriza":-3,"espinhoso":-2,"irrefletido":-2,"ameaçar":-2,"ameaças":-2,"emocionados":5,"frustrou":-2,"traversins":-2,"timorato":-2,"cansado":-2,"tits":-2,"tolerante":2,"desdentado":-2,"topo":2,"topos":2,"rasgado":-2,"tortura":-4,"torturados":-4,"torturas":-4,"torturando":-4,"totalitário":-2,"totalitarismo":-2,"aliciar":-2,"apregoados":-2,"touting":-2,"touts":-2,"tragédia":-2,"trágico":-2,"tranquilo":2,"armadilha":-1,"trauma":-3,"traumático":-3,"caricatura":-2,"tesouro":2,"tesouros":2,"trapaça":-2,"triunfo":4,"triunfante":4,"verdade":2,"Confiar em":1,"confiável":2,"tumor":-2,"twat":-5,"feio":-3,"inaceitável":-2,"pouco apreciado":-2,"não aprovado":-2,"inconsciente":-2,"inacreditável":-1,"incrédulo":-1,"imparcial":2,"incerto":-1,"obscuro":-1,"desconfortável":-2,"não confirmado":-1,"unconvinced":-1,"sem créditos":-1,"subestimar":-1,"subestimado":-1,"subavaliações":-1,"subestimando":-1,"minar":-2,"minado":-2,"indigno":-2,"indesejável":-2,"desemprego":-2,"desigual":-1,"inigualável":2,"antiético":-2,"Injusto":-2,"desfocado":-2,"por cumprir":-2,"pouco saudável":-2,"unificado":1,"unimpressed":-2,"pouco inteligente":-2,"unido":1,"antipático":-2,"incomparável":1,"desmotivado":-2,"não profissional":-2,"unresearched":-2,"unsecured":-2,"unsophisticated":-2,"instável":-2,"imparável":2,"sem suporte":-2,"untarnished":2,"não desejado":-2,"chateado":-2,"transtornos":-2,"urgente":-1,"utilidade":2,"inútil":-2,"inutilidade":-2,"vago":-2,"validar":1,"validado":1,"validates":1,"validando":1,"veredito":-1,"veredictos":-1,"investido":1,"vexação":-2,"vexatório":-2,"vibrante":3,"vicioso":-2,"vítima":-3,"vitimar":-3,"vitimados":-3,"vitimiza":-3,"victimizing":-3,"vítimas":-3,"Vigilância":3,"vil":-3,"vindicar":2,"vindicado":2,"vindicação":2,"violar":-2,"violados":-2,"viola":-2,"violando":-2,"violência":-3,"violento":-3,"virtuoso":2,"virulento":-2,"visão":1,"visionário":3,"visioning":1,"visões":1,"vitalidade":3,"vitamina":1,"vitriólico":-3,"vivaz":3,"vociferador":-1,"vulnerabilidade":-2,"vulnerável":-2,"ir embora":-2,"walkouts":-2,"punheteiro":-3,"quer":1,"guerra":-2,"caloroso":1,"calor":2,"advertir":-2,"advertido":-2,"aviso":-3,"Advertências":-3,"desperdício":-1,"desperdiçado":-2,"desperdiçando":-2,"vacilante":-1,"fraco":-2,"fraqueza":-2,"riqueza":3,"choro":-2,"esquisito":-2,"bem-vindo":2,"congratulou-":2,"congratula-":2,"caprichoso":1,"cal":-3,"prostituta":-4,"perverso":-2,"viúva":-1,"boa vontade":2,"vencedora":4,"vencedor":4,"vitórias":4,"winwin":3,"desejos":1,"desejando":1,"retirada":-3,"acabrunhado":-2,"mísero":-3,"cortejar":3,"woohoo":3,"wooo":4,"woow":4,"usado":-1,"preocupado":-3,"preocupar-se":-3,"preocupante":-3,"pior":-3,"piorar":-3,"piorou":-3,"piora":-3,"o pior":-3,"que vale a pena":2,"sem valor":-2,"digno":2,"Uau":4,"wowow":4,"wowww":4,"irado":-3,"naufrágio":-2,"errado":-2,"injustiçado":-2,"wtf":-4,"sim":1,"ânsia":1,"yeees":2,"juvenil":2,"yucky":-2,"gostoso":3,"fanático":-2,"zelotes":-2,"zeloso":2}
},{}],4:[function(require,module,exports){
var arr = [];
var each = arr.forEach;
var slice = arr.slice;


module.exports = function(obj) {
    each.call(slice.call(arguments, 1), function(source) {
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
};

},{}],"sentiment":[function(require,module,exports){
(function (process){
/**
 * AFINN-based sentiment analysis for Node.js
 *
 * @package sentiment
 * @author Andrew Sliwinski <andrewsliwinski@acm.org>
 */

/**
 * Dependencies
 */
var extend = require('extend-object');
var afinn = require('../build/AFINN.json');

/**
 * Tokenizes an input string.
 *
 * @param {String} Input
 *
 * @return {Array}
 */
function tokenize (input) {
    return input
            .replace(/[^a-zA-Z- ]+/g, '')
            .replace('/ {2,}/',' ')
            .toLowerCase()
            .split(' ');
}

/**
 * Performs sentiment analysis on the provided input "phrase".
 *
 * @param {String} Input phrase
 * @param {Object} Optional sentiment additions to AFINN (hash k/v pairs)
 *
 * @return {Object}
 */
module.exports = function (phrase, inject, callback) {
    // Parse arguments
    if (typeof phrase === 'undefined') phrase = '';
    if (typeof inject === 'undefined') inject = null;
    if (typeof inject === 'function') callback = inject;
    if (typeof callback === 'undefined') callback = null;

    // Merge
    if (inject !== null) {
        afinn = extend(afinn, inject);
    }

    // Storage objects
    var tokens      = tokenize(phrase),
        score       = 0,
        words       = [],
        positive    = [],
        negative    = [];

    // Iterate over tokens
    var len = tokens.length;
    while (len--) { 
        var obj = tokens[len];
        var item = afinn[obj];
        if (!afinn.hasOwnProperty(obj)) continue;

        words.push(obj);
        if (item > 0) positive.push(obj);
        if (item < 0) negative.push(obj);

        score += item;
    }

    // Handle optional async interface
    var result = {
        score:          score,
        comparative:    score / tokens.length,
        tokens:         tokens,
        words:          words,
        positive:       positive,
        negative:       negative
    };

    if (callback === null) return result;
    process.nextTick(function () {
        callback(null, result);
    });
};

}).call(this,require('_process'))
},{"../build/AFINN.json":3,"_process":1,"extend-object":4}]},{},[2]);
