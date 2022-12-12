import Vue from "vue";
import {
  Table,
  TableColumn,
  Message,
  Select,
  Option,
  Input
} from "element-ui";

Vue.use(Table).use(TableColumn).use(Select).use(Option).use(Input);

Vue.prototype.$message = Message;
