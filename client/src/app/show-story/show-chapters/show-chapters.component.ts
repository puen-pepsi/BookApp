import { RowContext } from '@angular/cdk/table';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from 'src/app/_models/chapter';
import { ChapterList } from 'src/app/_models/chapterlist';
import { ShowStoryService } from '../show-story.service';

@Component({
  selector: 'app-show-chapters',
  templateUrl: './show-chapters.component.html',
  styleUrls: ['./show-chapters.component.scss']
})
export class ShowChaptersComponent implements AfterViewInit{
  // @Input() ChapterList :Chapter;
  displayedColumns: string[] = ['order','chaptername','publishedCreated'];
  dataSource = new MatTableDataSource<ChapterList>();
  storyName;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private showstoryService:ShowStoryService,
              private route:ActivatedRoute,
              private router:Router) { 
                 this.storyName = this.route.snapshot.params.storyname;
                this.showstoryService.getStoryNameChapter(this.storyName).subscribe(res =>{
                  this.dataSource.data = res;
                  //console.log(this.dataSource)
                });
              }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  goTo(target:string) {
    //this.scroller.setOffset([0,100]);
    // this.scroller.scrollToAnchor("Chapter-"+ target);
    // console.log(this.scroller.getScrollPosition())
    // this.scroller.scrollToPosition([0,1059]);
    // this.router.navigate( [  ], { fragment: "Chapter-"+ target } )
    this.router.navigate(['/stories/Test17/chapters'], { fragment: 'Chapter-2' });
  }
  clickedRows(row){
    this.router.navigate(['/stories',this.storyName,'chapters'],{fragment:String(row.id)});
    // this.router.navigate(['/stories',this.storyName,'chapters']);
  }

}
