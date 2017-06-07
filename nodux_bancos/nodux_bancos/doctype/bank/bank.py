# -*- coding: utf-8 -*-
# Copyright (c) 2015, nodux and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe import _, throw
from frappe.utils import cint, flt
import frappe.defaults

class Bank(Document):
	def validate(self):
		self.validate_bank_account_number()
		self.validate_saldo_inicial()

	def validate_bank_account_number(self):
		bank_account_number = self.bank_account_number
		bank_name = self.bank_name
		if frappe.db.get_value("Bank", {"bank_account_number": bank_account_number, "bank_name": bank_name}):
			throw(_("Ya se encuentra defiido un banco con este número de cuenta"))

	def validate_saldo_inicial(self):
		for field in ["Saldo Inicial"]:
			if flt(self.get(frappe.scrub(field))) < 0:
				throw(_("{0} can not be negative").format(field))
