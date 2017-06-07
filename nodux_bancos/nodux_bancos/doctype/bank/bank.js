// Copyright (c) 2016, nodux and contributors
// For license information, please see license.txt

frappe.ui.form.on('Bank', {
	onload: function(frm){

	},
	refresh: function(frm) {

	},
	bank_name: function(frm){
		if (frm.doc.bank_name) {
			var bank = "";
			var act_circ = "Cuentas bancarias - ET";
			var account_type = "Bank";
			var banco = frm.doc.bank_name;
			// var a = frappe.scrub(banco);
			// msgprint("A: "+ a);

			//frappe.db.get_values("Account", {"parent_account": act_circ}, "account_name", function(r) {
			frappe.db.get_value("Account", {"parent_account": act_circ, "account_name": banco}, "account_name", function(r) {
				bank = r.account_name;
				//msgprint("Banco: "+ bank)
				if (bank != null) {
					if(bank == banco){
						frm.set_value("bank_account", bank + " - ET");
					}else{
						frm.set_value("bank_account", "");
					}

				} else {
					msgprint("No se ha encontrado un tipo de cuenta asociado");
				}
			})
		}
	}
});
