<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddTeacherDetailColumns extends Migration
{
    public function up()
    {
        if (! $this->db->tableExists('teachers')) {
            return;
        }

        $fields = [];

        if (! $this->db->fieldExists('department', 'teachers')) {
            $fields['department'] = [
                'type'       => 'VARCHAR',
                'constraint' => 150,
                'null'       => true,
            ];
        }

        if (! $this->db->fieldExists('phone_number', 'teachers')) {
            $fields['phone_number'] = [
                'type'       => 'VARCHAR',
                'constraint' => 20,
                'null'       => true,
            ];
        }

        if ($fields !== []) {
            $this->forge->addColumn('teachers', $fields);
        }
    }

    public function down()
    {
        if ($this->db->fieldExists('department', 'teachers')) {
            $this->forge->dropColumn('teachers', 'department');
        }

        if ($this->db->fieldExists('phone_number', 'teachers')) {
            $this->forge->dropColumn('teachers', 'phone_number');
        }
    }
}
